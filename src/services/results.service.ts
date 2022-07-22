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
}
