import { forwardRef, Module } from '@nestjs/common';
import { DashboardController } from 'src/controllers/dashboard.controller';
import { UserModule } from './user.module';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { ScrapeProcessor } from 'src/processors/scrape.processor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keywords } from 'src/entities/keywords.entity';
import { Users } from 'src/entities/user.entity';
import { KeywordsModule } from './keywords.module';
import { ScraperModule } from './scraper.module';
import { ParseCsvService } from 'src/services/keywords/parseCsv.service';
import { SaveKeywordsToDatabaseService } from 'src/services/keywords/saveKeywordstoDatabase.service';
import { GetGooglePageService } from 'src/services/scraper/getGooglePage.service';
import { SaveScrapedData } from 'src/services/scraper/saveScrapedData.service';
import { ScrapeGooglePage } from 'src/services/scraper/scrapeGooglePage.service';

const imports = [
  UserModule,
  HttpModule,
  KeywordsModule,
  ScraperModule,
  TypeOrmModule.forFeature([Keywords, Users]),
  BullModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      let redisOptions: any = {
        host: config.get<string>('REDIS_HOST'),
        port: config.get<number>('REDIS_PORT'),
        password: config.get<string>('REDIS_PASSWORD'),
      };

      if (process.env.NDOE_ENV == 'production') {
        redisOptions = {
          ...redisOptions,
          tls: {
            rejectUnauthorized: false,
          },
        };
      }

      return {
        redis: redisOptions,
        limiter: {
          max: 3,
          duration: 3000,
        },
      };
    },
  }),
  BullModule.registerQueue({
    name: 'scrape-queue',
  }),
];

@Module({
  imports,
  providers: [ScrapeProcessor],
  controllers: [DashboardController],
})
export class DashboardModule {}
