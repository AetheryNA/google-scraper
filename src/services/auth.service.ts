import { BadRequestException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const foundUser: any = await this.userService
      .findUser(username)
      .catch(() => {
        throw new BadRequestException({
          status: 400,
          message: username + ' does not exist',
        });
      });

    const verify = await compare(password, foundUser.password);

    if (verify) return foundUser;

    return false;
  }
}
