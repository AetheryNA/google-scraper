import { Module } from '@nestjs/common';
import { ResultsController } from 'src/controllers/results.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [ResultsController],
})
export class ResultsModule {}
