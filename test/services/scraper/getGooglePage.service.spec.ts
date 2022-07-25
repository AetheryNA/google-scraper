import { INestApplication } from '@nestjs/common';
import { clearDB, createNestAppInstance } from '../../test.helper';
import { GetGooglePageService } from 'src/services/scraper/getGooglePage.service';
import { createRandomWord } from '../../fixtures/randomKeyword.fixture';
import { convertHtmlToString } from '../../fixtures/convertHtmlToString.fixture';
import { expect } from '@jest/globals';

describe('Get google page service', () => {
  let nestApp: INestApplication;
  let service: GetGooglePageService;

  beforeEach(async () => {
    await clearDB();
  });

  beforeAll(async () => {
    nestApp = await createNestAppInstance();
    service = nestApp.get<GetGooglePageService>(GetGooglePageService);
  });

  afterAll(async () => {
    await nestApp.close();
  });

  it('should return the google page', async () => {
    const randomWord = createRandomWord();

    jest
      .spyOn(service, 'searchPagewithKeyword')
      .mockImplementation(async () => convertHtmlToString);

    const htmlData = await service.searchPagewithKeyword(randomWord);

    expect(htmlData).toBeDefined();
  });
});
