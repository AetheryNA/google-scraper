import { INestApplication } from '@nestjs/common';
import { clearDB, createNestAppInstance, createUser } from '../test.helper';
import { AuthService } from 'src/services/auth.service';
import { expect } from '@jest/globals';
import { createRandomUser } from '../fixtures/registerUser.fixture';

describe('User Service', () => {
  let nestApp: INestApplication;
  let service: AuthService;

  beforeEach(async () => {
    await clearDB();
  });

  beforeAll(async () => {
    nestApp = await createNestAppInstance();
    service = nestApp.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    await nestApp.close();
  });

  describe('Authentification', () => {
    it('should validate the user by checking if the password is accepted', async () => {
      const newUser = createRandomUser();

      const userData = await createUser(nestApp, {
        username: newUser.username,
        password: newUser.password,
      });

      const verifyUser = await service.validateUser(
        newUser.username,
        newUser.password,
      );

      expect(verifyUser).toStrictEqual(userData);
    });
  });
});
