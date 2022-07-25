import { Injectable } from '@nestjs/common';
import { load } from 'cheerio';

@Injectable()
export class ScrapeGooglePageService {
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
}
