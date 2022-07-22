import {
  Controller,
  Get,
  Render,
  Query,
  Req,
  UseGuards,
  Res,
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
  @Get('/view-html')
  @Render('view-html')
  async viewKeywordHtml(@Query() queryParam: any) {
    const getHtmlfromKeywordID =
      await this.resultsService.findHTMLwithKeywordID(queryParam.keywordID);

    return {
      keyword: queryParam.keywordName,
      rawHtml: getHtmlfromKeywordID,
    };
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
