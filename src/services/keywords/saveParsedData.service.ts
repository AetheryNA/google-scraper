import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Keywords } from 'src/entities/keywords.entity';
import { UserService } from 'src/services/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class SaveParsedDataService {
  constructor(
    @InjectRepository(Keywords)
    private keywordsRepository: Repository<Keywords>,
    private userService: UserService,
  ) {}

  async saveDataToDatabase(parsedData: any, userId: number): Promise<any> {
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
