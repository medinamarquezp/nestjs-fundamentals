import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoffeesModule } from '../coffees/coffees.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [CoffeesModule, ConfigModule],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
