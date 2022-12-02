import { Injectable } from '@nestjs/common';
import { serializedUser, User } from 'src/users/types';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      username: 'max',
      password: 'max',
    },
    {
      username: 'shotzy',
      password: 'shotzy',
    },
    {
      username: 'aarav',
      password: 'aarav',
    },
    {
      username: 'test',
      password: 'test',
    },
    {
      username: 'jovi',
      password: 'jovi',
    },
  ];
  getUsers() {
    return this.users.map((user) => new serializedUser(user));
  }

  getUsersByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
