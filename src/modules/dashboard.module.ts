import { Module } from '@nestjs/common';
import { DashboardController } from 'src/controllers/dashboard.controller';
import { UserModule } from './user.module';
import { DashboardService } from 'src/services/dashboard.service';

@Module({
  imports: [UserModule],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
