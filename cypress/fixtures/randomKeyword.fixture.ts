import { faker } from '@faker-js/faker';

export function createRandomWord() {
  return faker.word.noun(6);
}
