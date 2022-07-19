import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  Request,
  Res,
  Session,
  Get,
  Render,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { RegisterUser } from 'src/dto/registerUser.dto';
import { LoginUser } from 'src/dto/loginUser.dto';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/sign-up')
  @Render('sign-up')
  async renderSignUp() {
    return { message: 'Hello there' };
  }

  @Get('/sign-in')
  @Render('sign-in')
  async renderSignIn() {
    return { message: 'Hello there' };
  }

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
  async loginUser(
    @Body() loginUser: LoginUser,
    @Request() req,
    @Res() res: Response,
    @Session() session: any,
  ) {
    const verifyLogin = await this.authService.validateUser(
      loginUser.username,
      loginUser.password,
    );

    if (verifyLogin) {
      session.authenticated = true;

      res.redirect('/dashboard/home');

      return req.user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
