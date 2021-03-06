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
import { ParseCSVService } from 'src/services/keywords/parseData.service';
import { SaveParsedDataService } from 'src/services/keywords/saveParsedData.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('dashboard')
export class DashboardController {
  constructor(
    @InjectQueue('scrape-queue') private scrapeQueue: Queue,
    private parseCSVService: ParseCSVService,
    private saveParsedDataService: SaveParsedDataService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @Render('dashboard')
  async renderDashboard() {
    return null;
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/upload')
  @Render('dashboard')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
    @Req() req,
  ) {
    // TODO: Move the if condition logic into a service this shouldn't be at a controller level, Will be done in #50

    if (file.mimetype == 'text/csv' && file.size > 0) {
      const keywordsFromCSV = await this.parseCSVService.parseData(file);

      const saveDataAndReturnKeywordObj =
        await this.saveParsedDataService.saveDataToDatabase(
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
