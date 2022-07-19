import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('sign-in')
  root() {
    return null;
  }
}
