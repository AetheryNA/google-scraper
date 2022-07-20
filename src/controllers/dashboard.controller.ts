import {
  Controller,
  Get,
  Post,
  Render,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Req,
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
    @Req() req,
  ) {
    const keywordsFromCSV = await this.dashboardService.parseData(file);

    if (keywordsFromCSV) {
      await this.dashboardService.saveParsedDataToDatabase(
        keywordsFromCSV,
        req.user.id,
      );

      return {
        keywords: keywordsFromCSV,
        message: 'File uploaded successfully',
      };
    } else throw new Error('File cannot be uploaded');
  }
}
