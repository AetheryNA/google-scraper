import { INestApplication } from '@nestjs/common';
import { ScrapeGooglePageService } from 'src/services/scraper/scrapeGooglePage.service';
import { clearDB, createNestAppInstance } from '../../test.helper';
import { convertHtmlToString } from '../../fixtures/convertHtmlToString.fixture';
import { expect } from '@jest/globals';

describe('Scrape google page service', () => {
  let nestApp: INestApplication;
  let service: ScrapeGooglePageService;

  beforeEach(async () => {
    await clearDB();
  });

  beforeAll(async () => {
    nestApp = await createNestAppInstance();
    service = nestApp.get<ScrapeGooglePageService>(ScrapeGooglePageService);
  });

  afterAll(async () => {
    await nestApp.close();
  });

  it('should scrape the google page and return an object with the data needed', async () => {
    const totalResults = await service.getTotalResults(convertHtmlToString());

    expect(totalResults).toBeDefined();
    expect(typeof totalResults).toBe('object');
    expect(totalResults.total_ad_count).toEqual(12);
    expect(totalResults.total_link_count).toEqual(77);
    expect(totalResults.total_search_results).toEqual(
      'About 1,860,000,000 results (0.51 seconds) ',
    );
  });
});
