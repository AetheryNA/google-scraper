import { Module } from '@nestjs/common';
import { DashboardController } from 'src/controllers/dashboard.controller';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule],
  providers: [],
  controllers: [DashboardController],
})
export class DashboardModule {}
