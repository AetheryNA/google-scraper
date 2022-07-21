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
  @Post('/upload-file-and-scrape-data')
  @Render('dashboard')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
    @Req() req,
  ) {
    const keywordsFromCSV = await this.dashboardService.parseData(file);
    const totalFoundResults = [];

    if (keywordsFromCSV) {
      const saveDataAndReturnKeywordID =
        await this.dashboardService.saveParsedDataToDatabase(
          keywordsFromCSV,
          req.user.id,
        );

      for (const keyword of keywordsFromCSV) {
        const htmlData = await this.dashboardService.searchGoogleAndReturnHTML(
          keyword[0],
        );

        if (htmlData) {
          const getTotalScrapedResults =
            await this.dashboardService.getTotalResults(htmlData);

          totalFoundResults.push({
            keyword: keyword[0],
            ...getTotalScrapedResults,
          });

          saveDataAndReturnKeywordID.forEach(async (keywordID: number) => {
            await this.dashboardService.saveDataToKeywordsonDB(
              keywordID,
              totalFoundResults,
              htmlData,
            );
          });
        }
      }

      return {
        keywords: keywordsFromCSV,
        scrapedDataTotals: totalFoundResults,
        message: 'File uploaded successfully',
      };
    } else throw new Error('File cannot be uploaded');
  }
}
