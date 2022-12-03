import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ValidateCustomerMiddleware } from 'src/customers/middlewares/customer.middleware';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateCustomerMiddleware).forRoutes({
      path: 'customers/search/:id',
      method: RequestMethod.GET,
    });
  }
}
