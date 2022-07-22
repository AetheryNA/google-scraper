import { INestApplication } from '@nestjs/common';
import { DashboardService } from 'src/services/dashboard.service';
import {
  clearDB,
  createNestAppInstance,
  createUser,
  createKeywordEntry,
} from '../test.helper';
import { createRandomUser } from '../fixtures/registerUser.fixture';
import { createRandomWord } from '../fixtures/randomKeyword.fixture';
import { expect } from '@jest/globals';

describe('Dashboard Service', () => {
  let nestApp: INestApplication;
  let service: DashboardService;

  beforeEach(async () => {
    await clearDB();
  });

  beforeAll(async () => {
    nestApp = await createNestAppInstance();
    service = nestApp.get<DashboardService>(DashboardService);
  });

  afterAll(async () => {
    await nestApp.close();
  });

  describe('Scraping process', () => {
    it('should scrape google and return the html', async () => {
      const randomWord = createRandomWord();

      const htmlData = await service.searchGoogleAndReturnHTML(randomWord);

      expect(htmlData).toBeTruthy();
    });

    it('should scrape data from given html', async () => {
      const randomWord = createRandomWord();

      const htmlData = await service.searchGoogleAndReturnHTML(randomWord);

      const totalResults = await service.getTotalResults(htmlData);

      expect(typeof totalResults).toBe('object');
      expect(typeof totalResults.total_ad_count).toBe('number');
      expect(typeof totalResults.total_link_count).toBe('number');
      expect(typeof totalResults.total_search_results).toBe('string');
    });

    it('should save scraped data to database', async () => {
      const randomWord = createRandomWord();
      const randomUser = createRandomUser();

      const user = await createUser(nestApp, {
        username: randomUser.username,
        password: randomUser.password,
      });

      const keyword = await createKeywordEntry(nestApp, {
        userId: user.id,
        randomKeyword: randomWord,
      });

      const htmlData = await service.searchGoogleAndReturnHTML(randomWord);

      const totalResults = await service.getTotalResults(htmlData);

      const saveToDatabase = await service.saveDataToKeywordsonDB(
        keyword.id,
        totalResults,
        htmlData,
      );

      expect(saveToDatabase).toBeTruthy();
    });
  });
});
