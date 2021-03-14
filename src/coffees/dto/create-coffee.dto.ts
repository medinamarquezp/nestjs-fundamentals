import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  id?: number;

  @IsString()
  name: string;

  @IsString()
  brand: string;

  @IsString({ each: true })
  flavors: string[];

  setId(id: number): CreateCoffeeDto {
    this.id = id;
    return this;
  }
}
