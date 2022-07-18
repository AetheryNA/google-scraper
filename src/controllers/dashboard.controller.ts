import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { UserService } from 'src/services/user.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Get('/home')
  @Render('dashboard')
  async renderDashboard() {
    return { message: 'hello world' };
  }
}
