import { INestApplication } from '@nestjs/common';
import { DashboardService } from 'src/services/dashboard.service';
import { clearDB, createNestAppInstance } from '../test.helper';
import { expect } from '@jest/globals';
import { createReadStream, readFileSync } from 'fs';
import multer from 'multer';

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

  it('should parse CSV data and return the data in an array format', () => {
    const testFile = new File([], './test/fixtures/fixture.csv');

    console.log(testFile);
  });
});
