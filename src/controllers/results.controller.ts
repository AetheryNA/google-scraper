import { Controller, Get, Render } from '@nestjs/common';

@Controller('results')
export class ResultsController {
  @Get()
  @Render('results')
  async renderResultsPage() {
    return null;
  }
}
