import {
  Controller,
  Get,
  Param,
  Inject,
  HttpStatus,
  HttpException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { serializedUser } from 'src/users/types';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:username')
  getUserByUsername(@Param('username') username: string) {
    const user = this.userService.getUsersByUsername(username);
    if (user) return new serializedUser(user);
    else throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
