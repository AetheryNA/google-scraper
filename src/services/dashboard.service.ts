import { Injectable } from '@nestjs/common';
import { parse } from 'papaparse';
import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Keywords } from 'src/entities/keywords.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Keywords)
    private keywordsRepository: Repository<Keywords>,
    private userService: UserService,
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
    const findUser = await this.userService.findUserById(userId);

    parsedData.forEach((keyword: string) => {
      const saveKeyword = this.keywordsRepository.create({
        user: findUser,
        keyword: keyword[0],
        total_ads: 0,
        total_links: 0,
        total_search_results: '',
        html_of_page: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      this.keywordsRepository.save(saveKeyword);
    });
  }
}
