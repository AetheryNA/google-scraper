import {
  Controller,
  Get,
  Post,
  Render,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { DashboardService } from 'src/services/dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @Render('dashboard')
  async renderDashboard() {
    return null;
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/upload-file')
  @Render('dashboard')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.dashboardService.parseData(file);
  }
}
