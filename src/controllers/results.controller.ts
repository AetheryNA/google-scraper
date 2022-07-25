import {
  Controller,
  Get,
  Render,
  Query,
  Req,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ResultsService } from 'src/services/results.service';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';

@Controller('results')
export class ResultsController {
  constructor(private resultsService: ResultsService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  @Render('results')
  async renderResultsPage(@Req() req: any) {
    const allResultsForCurrentUser = await this.resultsService.findAllResults(
      req.user.id,
    );

    return {
      allFoundResults: allResultsForCurrentUser,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/:keyword_id/view-html')
  @Render('view-html')
  async viewKeywordHtml(@Param() param: any) {
    const getKeywordRecord = await this.resultsService.findKeywordByID(
      param.keyword_id,
    );

    return {
      keyword: getKeywordRecord.keyword,
      rawHtml: getKeywordRecord.html_of_page,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/search-keywords')
  @Render('results')
  async searchKeyword(@Query() queryParam: any, @Req() req: any) {
    const queryValue = await this.resultsService.findKeywordsByUserId(
      req.user.id,
      queryParam.keyword,
    );

    return {
      queriedValue: queryValue,
    };
  }
}
