import { Module } from '@nestjs/common';
import { DashboardController } from 'src/controllers/dashboard.controller';
import { UserModule } from './user.module';
import { DashboardService } from 'src/services/dashboard.service';
import { Keywords } from 'src/entities/keywords.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Keywords]), HttpModule],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
