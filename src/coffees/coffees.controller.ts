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
import { ApiNotFoundResponse, ApiRequestTimeoutResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@ApiTags('Coffees')
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

  @Public()
  @Get()
  async getAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Coffee[]> {
    // Testing Timeout interceptor
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return await this.coffeService.getAll(paginationQuery);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized exception' })
  @Get(':id')
  async getOne(
    @Protocol('https') protocol: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Coffee> {
    console.log(protocol);
    return await this.coffeService.getOne(id);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized exception' })
  @ApiRequestTimeoutResponse({ description: 'Timeout exception' })
  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    return this.coffeService.create(createCoffeeDto);
  }

  @ApiNotFoundResponse({ description: 'Not found exception' })
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
