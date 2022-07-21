import { Module } from '@nestjs/common';
import { DashboardController } from 'src/controllers/dashboard.controller';
import { UserModule } from './user.module';
import { DashboardService } from 'src/services/dashboard.service';
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
    HttpModule,
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          redis: {
            host: config.get<string>('REDIS_HOST'),
            port: config.get<number>('REDIS_PORT'),
            password: config.get<string>('REDIS_PASSWORD'),
          },
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
  providers: [DashboardService, ScrapeProcessor],
  controllers: [DashboardController],
})
export class DashboardModule {}
