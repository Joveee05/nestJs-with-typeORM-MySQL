import {
  Controller,
  Get,
  Param,
  Inject,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../../../customers/dtos/createUser.dto';
import { UserNotFoundException } from '../../exceptions/usernotfound.exceptions';
import { UsersService } from '../../../users/services/users/users.service';
import { serializedUser } from '../../types';

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
  @Get('/username/:username')
  getUserByUsername(@Param('username') username: string) {
    const user = this.userService.getUsersByUsername(username);
    if (user) return new serializedUser(user);
    else throw new UserNotFoundException();
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/id/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.getUserById(id);
    if (user) {
      return new serializedUser(user);
    } else {
      throw new UserNotFoundException();
    }
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
