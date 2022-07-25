import { INestApplication } from '@nestjs/common';
import { SaveTotalDataService } from 'src/services/scraper/saveTotalData.service';
import { createRandomWord } from '../../fixtures/randomKeyword.fixture';
import { createRandomUser } from '../../fixtures/registerUser.fixture';
import { generateRandomTotalResults } from '../../fixtures/generateRandomTotalResults.fixture';
import {
  clearDB,
  createNestAppInstance,
  createKeywordEntry,
  createUser,
} from '../../test.helper';
import { convertHtmlToString } from '../../fixtures/convertHtmlToString.fixture';
import { expect } from '@jest/globals';

describe('Save total data service', () => {
  let nestApp: INestApplication;
  let service: SaveTotalDataService;

  beforeEach(async () => {
    await clearDB();
  });

  beforeAll(async () => {
    nestApp = await createNestAppInstance();
    service = nestApp.get<SaveTotalDataService>(SaveTotalDataService);
  });

  afterAll(async () => {
    await nestApp.close();
  });

  it('saves the total data obtained to the database', async () => {
    const user = createRandomUser();
    const keyword = createRandomWord();
    const totals = generateRandomTotalResults();

    const createdUser = await createUser(nestApp, {
      username: user.username,
      password: user.password,
    });

    const createdKeyword = await createKeywordEntry(nestApp, {
      userId: createdUser.id,
      randomKeyword: keyword,
    });

    const saveData = await service.saveDataToKeywordsDB(
      createdKeyword.id,
      totals,
      convertHtmlToString(),
    );

    expect(saveData).toBeTruthy();
    expect(saveData.affected).toEqual(1);
  });
});
