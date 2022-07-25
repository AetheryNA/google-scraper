import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GetGooglePageService } from 'src/services/scraper/getGooglePage.service';
import { ScrapeGooglePageService } from 'src/services/scraper/scrapeGooglePage.service';
import { SaveTotalDataService } from 'src/services/scraper/saveTotalData.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keywords } from 'src/entities/keywords.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Keywords])],
  providers: [
    GetGooglePageService,
    ScrapeGooglePageService,
    SaveTotalDataService,
  ],
  exports: [
    GetGooglePageService,
    ScrapeGooglePageService,
    SaveTotalDataService,
  ],
})
export class ScraperModule {}
