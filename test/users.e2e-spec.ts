import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UsersController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });
  it('should create a user', () => {
    return request(app.getHttpServer())
      .post('/api/users/create')
      .send({
        username: 'abc',
        password: 'test12341234',
        email: 'abc@example.com',
      })
      .expect(201);
  });
  it('should return a 400 for invalid username', () => {
    return request(app.getHttpServer())
      .post('/api/users/create')
      .send({
        username: 'ab',
        password: 'test12341234',
        email: 'abc@example.com',
      })
      .expect(400);
  });
  it('should return a 400 for invalid password', () => {
    return request(app.getHttpServer())
      .post('/api/users/create')
      .send({
        username: 'abc',
        password: 'test',
        email: 'abc@example.com',
      })
      .expect(400);
  });
  it('should return a 400 for invalid email', () => {
    return request(app.getHttpServer())
      .post('/api/users/create')
      .send({
        username: 'abc',
        password: 'test12341234',
        email: 'abc',
      })
      .expect(400);
  });
});
