import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeService: CoffeesService,
    private readonly configService: ConfigService,
  ) {
    const databaseName = this.configService.get<string>(
      'DATABASE_NAME',
      'no-name',
    );
    console.log(databaseName);
  }

  @Get()
  async getAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Coffee[]> {
    return await this.coffeService.getAll(paginationQuery);
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Coffee> {
    return await this.coffeService.getOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    return this.coffeService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    this.coffeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.coffeService.delete(id);
  }

  @Patch(':id/recommend')
  recommend(@Param('id') id: number) {
    return this.coffeService.recommend(id);
  }
}
