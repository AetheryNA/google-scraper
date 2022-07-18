import * as request from 'supertest';
import { getManager } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { expect } from '@jest/globals';
import { clearDB, createNestAppInstanceWithENVMock } from '../test.helper';
import { Users } from 'src/entities/user.entity';
import { createRandomUser } from '../fixtures/registerUser.fixture';

describe('Users Controller', () => {
  let app: INestApplication;
  let mockConfig;

  beforeEach(async () => {
    await clearDB();
  });

  beforeAll(async () => {
    ({ app, mockConfig } = await createNestAppInstanceWithENVMock());
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /users/register-user', () => {
    it('should register a new user', async () => {
      const newUser = createRandomUser();

      const response = await request(app.getHttpServer())
        .post('/users/register-user')
        .send(newUser);

      expect(response.statusCode).toBe(201);

      const findCreatedUser = await getManager().findOneOrFail(Users, {
        where: { username: newUser.username },
      });

      expect(findCreatedUser.username).toEqual(newUser.username);
    });

    it('should return a 400 error when fields are empty', async () => {
      const emptyData = {};

      const response = await request(app.getHttpServer())
        .post('/users/register-user')
        .send(emptyData);

      expect(response.statusCode).toBe(400);
      expect(response.body.message.message).toStrictEqual([
        'username must be longer than or equal to 5 characters',
        'username must be a string',
        'password must be longer than or equal to 8 characters',
        'password must be a string',
      ]);
    });

    it('should return a 400 error when username is already taken', async () => {
      const newUser = createRandomUser();

      await request(app.getHttpServer())
        .post('/users/register-user')
        .send(newUser);

      const response = await request(app.getHttpServer())
        .post('/users/register-user')
        .send(newUser);

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toStrictEqual(
        'Username is already in use, please try another username',
      );
    });
  });
});
