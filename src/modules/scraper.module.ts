import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keywords } from 'src/entities/keywords.entity';
import { UserModule } from './user.module';
import { GetGooglePageService } from 'src/services/scraper/getGooglePage.service';
import { SaveScrapedData } from 'src/services/scraper/saveScrapedData.service';
import { ScrapeGooglePage } from 'src/services/scraper/scrapeGooglePage.service';
import { HttpModule } from '@nestjs/axios';
import { Users } from 'src/entities/user.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Keywords, Users]),
    HttpModule,
  ],
  providers: [GetGooglePageService, SaveScrapedData, ScrapeGooglePage],
  controllers: [],
  exports: [GetGooglePageService, SaveScrapedData, ScrapeGooglePage],
})
export class ScraperModule {}
