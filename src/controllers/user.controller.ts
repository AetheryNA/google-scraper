import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { RegisterUser } from 'src/dto/registerUser.dto';
import { LoginUser } from 'src/dto/loginUser.dto';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/register-user')
  async registerNewUser(@Body() registerUser: RegisterUser) {
    const { username, password } = registerUser;

    await this.userService
      .registerNewUser({
        username: username,
        password: password,
      })
      .catch((error) => {
        if (error.code == 23505)
          throw new HttpException(
            'Username is already in use, please try another username',
            HttpStatus.BAD_REQUEST,
          );
      });

    return `${username} has been created`;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login-user')
  async loginUser(@Body() loginUser: LoginUser, @Request() req) {
    const verifyLogin = await this.authService.validateUser(
      loginUser.username,
      loginUser.password,
    );

    if (verifyLogin) {
      return req.user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
