import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { UserService } from 'src/services/user.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private _userService: UserService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @Render('dashboard')
  async renderDashboard() {
    return null;
  }
}
