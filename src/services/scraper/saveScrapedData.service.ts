import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Keywords } from 'src/entities/keywords.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaveScrapedData {
  constructor(
    @InjectRepository(Keywords)
    private keywordsRepository: Repository<Keywords>,
  ) {}

  async saveDataToKeywordsonDB(
    keywordID: number,
    dataToSave: any,
    htmlData: string,
  ) {
    return this.keywordsRepository.update(keywordID, {
      total_ads: dataToSave.total_ad_count,
      total_links: dataToSave.total_link_count,
      total_search_results: dataToSave.total_search_results,
      html_of_page: htmlData,
    });
  }
}
