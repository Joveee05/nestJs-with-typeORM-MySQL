import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { serializedUser, User } from 'src/users/types';
import { User as UserEntity } from '../../../typeorm/user';
import { CreateUserDto } from 'src/customers/dtos/createUser.dto';
import { encodePassword } from '../../../../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  private users: User[] = [];
  getUsers() {
    return this.users.map((user) => new serializedUser(user));
  }

  getUsersByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const newUser = this.userRepository.create({ ...createUserDto, password });
    return this.userRepository.save(newUser);
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({ username });
  }

  findUserById(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }
}
