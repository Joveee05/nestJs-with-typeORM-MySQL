import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { User } from './typeorm/user';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SessionEntity } from './typeorm';
@Module({
  imports: [
    CustomersModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ejovi@1997',
      database: 'nestjs_typeorm',
      entities: [User, SessionEntity],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
