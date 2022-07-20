import { Injectable } from '@nestjs/common';
import { parse } from 'papaparse';
import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Keywords } from 'src/entities/keywords.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { load } from 'cheerio';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Keywords)
    private keywordsRepository: Repository<Keywords>,
    private userService: UserService,
    private readonly httpService: HttpService,
  ) {}

  async parseData(csvFile: Express.Multer.File): Promise<any> {
    const csvBufferData = csvFile.buffer.toString();

    const parsedCSV = parse(csvBufferData, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => results.data,
    });

    if (parsedCSV) {
      return parsedCSV.data;
    } else throw new Error('Error parsing CSV data');
  }

  async saveParsedDataToDatabase(
    parsedData: any,
    userId: number,
  ): Promise<any> {
    const foundUser = await this.userService.findUserById(userId);

    parsedData.map(async (keyword: string) => {
      const saveKeyword = this.keywordsRepository.create({
        user: foundUser,
        keyword: keyword[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      this.keywordsRepository.save(saveKeyword);
    });
  }

  async searchGooglePageAndReturnHTML(): Promise<any> {
    const url = 'https://www.google.com/search?q=eula';

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

    scrapeDataSource('.yuRUbf', htmlData).each(function () {
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
