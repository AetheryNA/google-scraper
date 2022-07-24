import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { GetGooglePageService } from 'src/services/scraper/getGooglePage.service';
import { ScrapeGooglePage } from 'src/services/scraper/scrapeGooglePage.service';
import { SaveScrapedData } from 'src/services/scraper/saveScrapedData.service';

@Processor('scrape-queue')
export class ScrapeProcessor {
  constructor(
    private getGooglePageService: GetGooglePageService,
    private scrapeGooglePage: ScrapeGooglePage,
    private saveScrapedData: SaveScrapedData,
  ) {}

  @Process('initate_worker_process')
  async initateWorkerProcess(job: Job) {
    const htmlData = await this.getGooglePageService.getGooglePage(
      job.data.keyword,
    );

    const totalResults = await this.scrapeGooglePage.getTotalResults(htmlData);

    await this.saveScrapedData.saveDataToKeywordsonDB(
      job.data.id,
      totalResults,
      htmlData,
    );
  }
}
