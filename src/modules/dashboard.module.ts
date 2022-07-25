import { Module } from '@nestjs/common';
import { DashboardController } from 'src/controllers/dashboard.controller';
import { UserModule } from './user.module';
import { KeywordsModule } from './keywords.module';
import { ScraperModule } from './scraper.module';
import { Keywords } from 'src/entities/keywords.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { ScrapeProcessor } from 'src/processors/scrape.processor';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Keywords]),
    KeywordsModule,
    ScraperModule,
    HttpModule,
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
  ],
  providers: [ScrapeProcessor],
  controllers: [DashboardController],
})
export class DashboardModule {}
