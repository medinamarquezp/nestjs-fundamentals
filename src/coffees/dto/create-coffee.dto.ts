import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  id?: number;

  @ApiProperty({ description: 'The name of coffee', example: 'Arabiga' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The brand of coffee', example: 'Nestcafe' })
  @IsString()
  brand: string;

  @ApiProperty({ example: [] })
  @IsString({ each: true })
  flavors: string[];

  setId(id: number): CreateCoffeeDto {
    this.id = id;
    return this;
  }
}
