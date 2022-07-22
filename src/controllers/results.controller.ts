import { Controller, Get, Render, Query, Req, UseGuards } from '@nestjs/common';
import { ResultsService } from 'src/services/results.service';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';

@Controller('results')
export class ResultsController {
  constructor(private resultsService: ResultsService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  @Render('results')
  async renderResultsPage() {
    return null;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/search-keywords')
  @Render('results')
  async searchKeyword(@Query() queryParam: any, @Req() req: any) {
    const queryValue = await this.resultsService.findKeywordsByUserId(
      req.user.id,
      queryParam.keywordToSearch,
    );

    return {
      queriedValue: queryValue,
    };
  }
}
