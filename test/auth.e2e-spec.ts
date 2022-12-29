import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { getRepository } from 'typeorm';
import { SessionEntity } from '../src/typeorm/session';

describe('UsersController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    const sessionRepository = getRepository(SessionEntity);
    app.use(
      session({
        name: 'NESTJS_SESSION',
        secret: 'QWHSYEhdhdhHHHHheueskl',
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 600000,
          httpOnly: true,
        },
        store: new TypeormStore({
          cleanupLimit: 10,
        }).connect(sessionRepository),
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    await app.init();
  });

  describe('Authentication', () => {
    const URL = '/api/auth/login';
    it('should log user in', () => {
      return request(app.getHttpServer())
        .post(URL)
        .send({
          username: 'timmy1',
          password: 'test12341234',
        })
        .expect(201);
    });
  });
});
