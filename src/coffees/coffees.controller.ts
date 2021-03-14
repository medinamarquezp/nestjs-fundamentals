import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeService: CoffeesService) {}

  @Get()
  getAll(): Coffee[] {
    return this.coffeService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Coffee {
    return this.coffeService.getOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto): Coffee[] {
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
}
