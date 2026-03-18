import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Products from 'src/entities/Product';
import { LoggingMiddleware } from 'src/middleware/logging/logging.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes({
      path: 'products',
      method: RequestMethod.ALL,
    });
  }
}
