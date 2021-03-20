import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

describe('CoffeesService', () => {
  let coffeesService: CoffeesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(Coffee), useValue: {} },
        { provide: getRepositoryToken(Flavor), useValue: {} },
        { provide: 'BRANDS', useValue: {} },
      ],
    }).compile();

    coffeesService = await moduleRef.resolve<CoffeesService>(CoffeesService);
  });
  it('should be defined', () => {
    expect(coffeesService).toBeDefined();
  });
});
