import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffeesList: Coffee[] = [
    {
      id: 1,
      name: 'Arabiga',
      brand: 'Marcilla',
      flavors: ['vanilla', 'honey'],
    },
  ];

  getAll(): Coffee[] {
    return this.coffeesList;
  }

  getOne(id: number): Coffee {
    const coffee = this.coffeesList.find((coffe) => coffe.id === Number(id));
    if (!coffee) {
      throw new NotFoundException(`Coffee with id ${id} does not exists`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto): Coffee[] {
    createCoffeeDto.setId(this.coffeesList.length + 1);
    this.coffeesList.push(createCoffeeDto);
    return this.coffeesList;
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const index = this.coffeesList.findIndex((coffe) => coffe.id === id);
    if (index === -1) {
      throw new NotFoundException(`Coffee with id ${id} does not exists`);
    }
    this.coffeesList[index] = {
      ...this.coffeesList[index],
      ...updateCoffeeDto,
    };
  }

  delete(id: number) {
    const index = this.coffeesList.findIndex((coffe) => coffe.id === id);
    if (index === -1) {
      throw new NotFoundException(`Coffee with id ${id} does not exists`);
    }
    this.coffeesList.splice(index, 1);
  }
}
