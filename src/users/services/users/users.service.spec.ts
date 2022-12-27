import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../typeorm/user';
import { UsersService } from './users.service';
import * as bcryptUtils from '../../../../utils/bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user with encoded password', async () => {
      jest.spyOn(bcryptUtils, 'encodePassword').mockReturnValue('hashed123');
      await service.createUser({
        username: 'abc',
        email: 'abc@example.com',
        password: '123',
      });
      expect(bcryptUtils.encodePassword).toHaveBeenCalledWith('123');
    });
    it('should call userRepository.create with correct param', async () => {
      await service.createUser({
        username: 'abc',
        email: 'abc@example.com',
        password: '123',
      });
      expect(userRepository.create).toHaveBeenCalledWith({
        username: 'abc',
        email: 'abc@example.com',
        password: 'hashed123',
      });
    });
  });
});
