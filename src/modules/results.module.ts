import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsController } from 'src/controllers/results.controller';
import { Keywords } from 'src/entities/keywords.entity';
import { ResultsService } from 'src/services/results.service';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Keywords])],
  providers: [ResultsService],
  controllers: [ResultsController],
})
export class ResultsModule {}
