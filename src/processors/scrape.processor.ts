import { Process, Processor } from '@nestjs/bull';
import { HttpService } from '@nestjs/axios';
import { Job } from 'bull';
import { load } from 'cheerio';
import { Keywords } from 'src/entities/keywords.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Processor('scrape-queue')
export class ScrapeProcessor {
  constructor(
    @InjectRepository(Keywords)
    private keywordsRepository: Repository<Keywords>,
    private httpService: HttpService,
  ) {}

  @Process('initate_worker_process')
  async initateWorkerProcess(job: Job) {
    const htmlData = await this.searchGoogleAndReturnHTMLBGProcess(
      job.data.keyword,
    );

    const totalResults = await this.getTotalResults(htmlData);

    await this.saveDataToKeywordsonDB(job.data.id, totalResults, htmlData);
  }

  async searchGoogleAndReturnHTMLBGProcess(urlKeyword: string): Promise<any> {
    const url = `https://www.google.com/search?q=${urlKeyword}`;

    const getResponseData = await this.httpService.axiosRef(url, {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
      },
    });

    return getResponseData.data;
  }

  async getTotalResults(htmlData: string) {
    const scrapeDataSource = load(htmlData);

    let totalAdsCount = 0;
    let totalLinksCount = 0;
    let totalSearchResults = '';

    scrapeDataSource('.CnP9N.U3A9Ac.irmCpc', htmlData).each(function () {
      const advert = scrapeDataSource(this).text();

      if (advert) totalAdsCount++;
    });

    scrapeDataSource(htmlData)
      .find('a')
      .each(function () {
        const link = scrapeDataSource(this).text();

        if (link) totalLinksCount++;
      });

    totalSearchResults = scrapeDataSource('#result-stats', htmlData).text();

    return {
      total_ad_count: totalAdsCount,
      total_link_count: totalLinksCount,
      total_search_results: totalSearchResults,
    };
  }

  async saveDataToKeywordsonDB(
    keywordID: number,
    dataToSave: any,
    htmlData: string,
  ) {
    this.keywordsRepository.update(keywordID, {
      total_ads: dataToSave.total_ad_count,
      total_links: dataToSave.total_link_count,
      total_search_results: dataToSave.total_search_results,
      html_of_page: htmlData,
    });
  }
}
