import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keywords } from 'src/entities/keywords.entity';
import { ParseCsvService } from 'src/services/keywords/parseCsv.service';
import { SaveKeywordsToDatabaseService } from 'src/services/keywords/saveKeywordstoDatabase.service';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Keywords])],
  providers: [ParseCsvService, SaveKeywordsToDatabaseService],
  controllers: [],
  exports: [ParseCsvService, SaveKeywordsToDatabaseService],
})
export class KeywordsModule {}
