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
    const keywordIds = [];

    for (const keyword of parsedData) {
      const saveKeyword = this.keywordsRepository.create({
        user: foundUser,
        keyword: keyword[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const resultToSave = await this.keywordsRepository.save(saveKeyword);

      keywordIds.push({
        id: resultToSave.id,
        keyword: resultToSave.keyword,
      });
    }

    return keywordIds;
  }
}
