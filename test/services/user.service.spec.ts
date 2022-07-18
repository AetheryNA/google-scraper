import { INestApplication } from '@nestjs/common';
import { getManager, QueryFailedError } from 'typeorm';
import { clearDB, createNestAppInstance, createUser } from '../test.helper';
import { UserService } from 'src/services/user.service';
import { Users } from 'src/entities/user.entity';
import { expect } from '@jest/globals';
import { createRandomUser } from '../fixtures/registerUser.fixture';
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
      const newUser = createRandomUser();

      await service.registerNewUser({
        username: newUser.username,
        password: newUser.password,
      });

      const manager = getManager();
      const createdUser = await manager.findOneOrFail(Users, {
        where: { username: newUser.username },
      });

      expect(createdUser).toBeTruthy();
      expect(createdUser.username).toEqual(newUser.username);
    });

    it('should return an error if the username is taken', async () => {
      const newUser = createRandomUser();

      await createUser(nestApp, {
        username: newUser.username,
        password: newUser.password,
      });

      try {
        await service.registerNewUser({
          username: newUser.username,
          password: newUser.password,
        });
      } catch (error) {
        expect(error).toEqual(
          new Error(
            'duplicate key value violates unique constraint "UQ_fe0bb3f6520ee0469504521e710"',
          ),
        );
      }
    });

    it('should find the added user', async () => {
      const newUser = createRandomUser();

      await createUser(nestApp, {
        username: newUser.username,
        password: newUser.password,
      });

      const findAddedUser = await service.findUser(newUser.username);

      const manager = getManager();
      const createdUser = await manager.findOneOrFail(Users, {
        where: { username: newUser.username },
      });

      expect(createdUser.username).toEqual(findAddedUser.username);
    });
  });
});
