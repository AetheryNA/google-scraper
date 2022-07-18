import { faker } from '@faker-js/faker';
import { RegisterUser } from 'src/dto/registerUser.dto';

export const USERS: RegisterUser[] = [];

export function createRandomUser(): RegisterUser {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };
}
