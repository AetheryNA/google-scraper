import { INestApplication } from '@nestjs/common';
import { DashboardService } from 'src/services/dashboard.service';
import { clearDB, createNestAppInstance } from '../test.helper';

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

  // TODO: Add test for parsing CSVs using Multer File type
});
