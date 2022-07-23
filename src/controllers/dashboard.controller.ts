import {
  Controller,
  Get,
  Post,
  Render,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { DashboardService } from 'src/services/dashboard.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('dashboard')
export class DashboardController {
  constructor(
    @InjectQueue('scrape-queue') private scrapeQueue: Queue,
    private dashboardService: DashboardService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @Render('dashboard')
  async renderDashboard() {
    return null;
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/upload-file-and-scrape-data')
  @Render('dashboard')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
    @Req() req,
  ) {
    // TODO: Move the if condition logic into a service this shouldn't be at a controller level, Will be done in #50

    if (file.mimetype == 'text/csv' && file.size > 0) {
      const keywordsFromCSV = await this.dashboardService.parseData(file);

      const saveDataAndReturnKeywordObj =
        await this.dashboardService.saveParsedDataToDatabase(
          keywordsFromCSV,
          req.user.id,
        );

      saveDataAndReturnKeywordObj.forEach((keywordObj) => {
        this.scrapeQueue.add('initate_worker_process', {
          id: keywordObj.id,
          keyword: keywordObj.keyword,
        });
      });

      return {
        keywords: keywordsFromCSV,
        message: 'File uploaded successfully',
      };
    } else throw new UnprocessableEntityException('Please upload a valid file');
  }
}
