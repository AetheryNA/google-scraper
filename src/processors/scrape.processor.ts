import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { DashboardService } from 'src/services/dashboard.service';

@Processor('scrape-queue')
export class ScrapeProcessor {
  constructor(private dashboardService: DashboardService) {}

  @Process('initate_worker_process')
  async initateWorkerProcess(job: Job) {
    const htmlData = await this.dashboardService.searchGoogleAndReturnHTML(
      job.data.keyword,
    );

    const totalResults = await this.dashboardService.getTotalResults(htmlData);

    await this.dashboardService.saveDataToKeywordsonDB(
      job.data.id,
      totalResults,
      htmlData,
    );
  }
}
