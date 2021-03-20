import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { LogginMiddleware } from './middlewares/loggin.middleware';

@Module({
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
  imports: [ConfigModule],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LogginMiddleware).forRoutes('*');
    consumer.apply(LogginMiddleware).forRoutes({
      path: 'coffees',
      method: RequestMethod.POST,
    });
  }
}
