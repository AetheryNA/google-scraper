import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { GetGooglePageService } from 'src/services/scraper/getGooglePage.service';
import { ScrapeGooglePageService } from 'src/services/scraper/scrapeGooglePage.service';
import { SaveTotalDataService } from 'src/services/scraper/saveTotalData.service';

@Processor('scrape-queue')
export class ScrapeProcessor {
  constructor(
    private getGooglePageService: GetGooglePageService,
    private scrapeGooglePageService: ScrapeGooglePageService,
    private saveTotalDataService: SaveTotalDataService,
  ) {}

  @Process('initate_worker_process')
  async initateWorkerProcess(job: Job) {
    const htmlData = await this.getGooglePageService.searchPagewithKeyword(
      job.data.keyword,
    );

    const totalResults = await this.scrapeGooglePageService.getTotalResults(
      htmlData,
    );

    await this.saveTotalDataService.saveDataToKeywordsDB(
      job.data.id,
      totalResults,
      htmlData,
    );
  }
}
