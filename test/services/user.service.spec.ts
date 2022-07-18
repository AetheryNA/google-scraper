import { INestApplication } from '@nestjs/common';
import { getManager } from 'typeorm';
import { clearDB, createNestAppInstance, createUser } from '../test.helper';
import { UserService } from 'src/services/user.service';
import { Users } from 'src/entities/user.entity';
import { expect } from '@jest/globals';
import { genSalt, hash } from 'bcrypt';

describe('User Service', () => {
  let nestApp: INestApplication;
  let service: UserService;

  beforeEach(async () => {
    await clearDB();
  });

  beforeAll(async () => {
    nestApp = await createNestAppInstance();
    service = nestApp.get<UserService>(UserService);
  });

  afterAll(async () => {
    await nestApp.close();
  });

  describe('Registration', () => {
    it('should encrypt the password', async () => {
      const password = 'password';
      const salt = await genSalt(5);
      const encryptedPassword = await hash(password, salt);

      expect(encryptedPassword).toBeTruthy();
    });

    it('should create a new user', async () => {
      await service.registerNewUser({
        username: 'TestUser',
        password: 'testpassword',
      });

      const manager = getManager();
      const createdUser = await manager.findOneOrFail(Users, {
        where: { username: 'TestUser' },
      });

      expect(createdUser).toBeTruthy();
      expect(createdUser.username).toEqual('TestUser');
    });

    it('should return an error if all fields are empty', async () => {
      await expect(
        async () =>
          await service.registerNewUser({ username: '', password: '' }),
      ).rejects.toThrowError(Error);
    });

    it('should return an error if the username is taken', async () => {
      await createUser(nestApp, {
        username: 'TestUser',
        password: 'testpassword',
      });

      expect(
        async () =>
          await service.registerNewUser({
            username: 'TestUser',
            password: 'testpassword',
          }),
      ).rejects.toThrowError(Error);
    });
  });
});
