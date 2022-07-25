import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keywords } from 'src/entities/keywords.entity';
import { ParseCSVService } from 'src/services/keywords/parseData.service';
import { SaveParsedDataService } from 'src/services/keywords/saveParsedData.service';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Keywords])],
  providers: [ParseCSVService, SaveParsedDataService],
  exports: [ParseCSVService, SaveParsedDataService],
})
export class KeywordsModule {}
