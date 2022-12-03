import { Module } from '@nestjs/common';
import { AuthControllerController } from './controllers/auth-controller/auth-controller.controller';
import { AuthServicesService } from './services/auth-services/auth-services.service';

@Module({
  controllers: [AuthControllerController],
  providers: [AuthServicesService]
})
export class AuthModule {}
