import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CoffeesService } from '../coffees/coffees.service';

@Injectable({ scope: Scope.TRANSIENT })
export class CoffeeRatingService {
  constructor(
    private readonly coffeesService: CoffeesService,
    private readonly configService: ConfigService,
  ) {
    const databaseName = this.configService.get<string>(
      'DATABASE_NAME',
      'no-name',
    );
    console.log(databaseName);
  }
}
