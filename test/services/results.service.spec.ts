import { INestApplication } from '@nestjs/common';
import { expect } from '@jest/globals';
import { ResultsService } from 'src/services/results.service';
import {
  clearDB,
  createNestAppInstance,
  createUser,
  createKeywordEntry,
} from '../test.helper';
import { createRandomUser } from '../fixtures/registerUser.fixture';
import { createRandomWord } from '../fixtures/randomKeyword.fixture';

describe('Results Service', () => {
  let nestApp: INestApplication;
  let service: ResultsService;

  beforeEach(async () => {
    await clearDB();
  });

  beforeAll(async () => {
    nestApp = await createNestAppInstance();
    service = nestApp.get<ResultsService>(ResultsService);
  });

  afterAll(async () => {
    await nestApp.close();
  });

  it('should find a keyword and return the value', async () => {
    const randomUser = createRandomUser();
    const randomWord = createRandomWord();

    const user = await createUser(nestApp, {
      username: randomUser.username,
      password: randomUser.password,
    });

    await createKeywordEntry(nestApp, {
      userId: user.id,
      randomKeyword: randomWord,
    });

    const retrievedQuery = await service.findKeywordsByUserId(
      user.id,
      randomWord,
    );

    expect(retrievedQuery).toBeTruthy();
    expect(typeof retrievedQuery).toBe('object');
    expect(retrievedQuery.keyword).toEqual(randomWord);
  });
});
