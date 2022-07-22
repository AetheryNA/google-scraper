import { Controller, Get, Render, Query, Req } from '@nestjs/common';
import { ResultsService } from 'src/services/results.service';
import { Request } from 'express';

@Controller('results')
export class ResultsController {
  constructor(private resultsService: ResultsService) {}

  @Get()
  @Render('results')
  async renderResultsPage() {
    return null;
  }

  @Get('/search-keywords')
  @Render('results')
  async searchKeyword(@Query() queryParam: any, @Req() req: Request) {
    const queryValue = await this.resultsService.findKeywordsByUserId(
      1,
      queryParam.keywordToSearch,
    );

    return {
      queriedValue: queryValue,
    };
  }
}
