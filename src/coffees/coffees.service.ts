import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';
import { Connection, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable({ scope: Scope.REQUEST })
export class CoffeesService {
  private logger = new Logger(CoffeesService.name);

  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly connection: Connection,
    @Inject('BRANDS') brands: string[],
  ) {
    console.log(brands);
  }

  async getAll(paginationQuery: PaginationQueryDto): Promise<Coffee[]> {
    this.logger.log('Get all coffees request done');
    const { offset, limit } = paginationQuery;
    return this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }

  async getOne(id: number): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne(id, {
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee with id ${id} does not exists`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavourByName(name)),
    );
    const coffee = { ...createCoffeeDto, flavors };
    const createdCoffee = this.coffeeRepository.create(coffee);
    return await this.coffeeRepository.save(createdCoffee);
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee> {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavourByName(name)),
      ));
    const updatedCoffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
      flavors,
    });
    return await this.coffeeRepository.save(updatedCoffee);
  }

  async delete(id: number) {
    const coffee = await this.getOne(id);
    return await this.coffeeRepository.remove(coffee);
  }

  async recommend(id: number) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const coffee = await this.getOne(id);
      coffee.recomendations++;
      await queryRunner.manager.save(coffee);

      const event = new Event();
      event.name = 'recomment_coffee';
      event.type = 'coffee';
      event.payload = JSON.stringify({ coffeeId: coffee.id });
      await queryRunner.manager.save(event);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadFlavourByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({ name });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
