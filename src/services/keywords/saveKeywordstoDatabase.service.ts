import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Keywords } from 'src/entities/keywords.entity';
import { UserService } from '../user.service';
import { EntityManager } from 'typeorm';

@Injectable()
export class SaveKeywordsToDatabaseService {
  constructor(
    @InjectRepository(Keywords)
    private userService: UserService,
    private entityManager: EntityManager,
  ) {}

  async saveParsedData(parsedData: any, userId: number): Promise<any> {
    const foundUser = await this.userService.findUserById(userId);
    const keywordIds = [];

    for (const keyword of parsedData) {
      const saveKeyword = this.entityManager.create(Keywords, {
        user: foundUser,
        keyword: keyword[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const resultToSave = await this.entityManager.save(saveKeyword);

      keywordIds.push({
        id: resultToSave.id,
        keyword: resultToSave.keyword,
      });
    }

    return keywordIds;
  }
}
