import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from '../typeorm/user';
import { UsersService } from '../users/services/users/users.service';
import { AuthController } from './controllers/auth-controller/auth.controller';
import { AuthService } from './services/auth-services/auth.service';
import { LocalStorage } from './utils/localstrategy';
import { Session } from './utils/session';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      session: true,
    }),
  ],
  controllers: [AuthController],
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
    Session,
  ],
})
export class AuthModule {}
