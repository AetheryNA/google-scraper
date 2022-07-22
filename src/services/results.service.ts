import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Keywords } from 'src/entities/keywords.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Keywords)
    private keywordsRepository: Repository<Keywords>,
  ) {}

  async findKeywordsByUserId(userId: number, keyword: any) {
    return await this.keywordsRepository
      .findOne({
        where: { user: userId, keyword: keyword },
      })
      .catch(() => {
        throw new Error('Cannot find keyword');
      });
  }

  async findHTMLwithKeywordID(keywordID: number) {
    return await this.keywordsRepository
      .findOne({
        where: { id: keywordID },
        select: ['html_of_page'],
      })
      .catch(() => {
        throw new Error('Keyword ID is not valid');
      });
  }

  async findAllResults(userId: number) {
    return await this.keywordsRepository
      .find({
        where: { user: userId },
        select: [
          'id',
          'keyword',
          'total_ads',
          'total_links',
          'total_search_results',
        ],
      })
      .catch(() => {
        throw new Error('Cannot find user');
      });
  }
}
