import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { RegisterUser } from 'src/dto/registerUser.dto';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

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
}
