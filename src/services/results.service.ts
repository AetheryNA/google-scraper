import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Keywords } from 'src/entities/keywords.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Keywords)
    private keywordsRepository: Repository<Keywords>,
  ) {}

  async findKeywordsByUserId(userId: number, keyword: any) {
    return await this.keywordsRepository
      .find({
        where: { user: userId, keyword: ILike(`%${keyword}%`) },
      })
      .catch(() => {
        throw new NotFoundException('Cannot find keyword');
      });
  }

  async findKeywordByID(keywordID: number) {
    return await this.keywordsRepository
      .findOne({
        where: { id: keywordID },
      })
      .catch(() => {
        throw new NotFoundException('Keyword ID is not valid');
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
        throw new NotFoundException('Cannot find user');
      });
  }
}
