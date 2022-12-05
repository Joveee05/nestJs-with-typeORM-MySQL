import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from 'src/typeorm/user';
import { UsersService } from 'src/users/services/users/users.service';
import { AuthControllerController } from './controllers/auth-controller/auth.controller';
import { AuthService } from './services/auth-services/auth.service';
import { LocalStorage } from './utils/localstrategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  controllers: [AuthControllerController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    LocalStorage,
  ],
})
export class AuthModule {}
