import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserParams } from 'src/common/types/userParams';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async registerNewUser(userParams: UserParams): Promise<void> {
    const { username, password } = userParams;

    const salt = await genSalt(5);
    const encryptedPassword = await hash(password, salt);

    const createNewUser = this.usersRepository.create({
      username: username,
      password: encryptedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.usersRepository.save(createNewUser);
  }

  async findUser(username: string): Promise<any> {
    return await this.usersRepository.findOneOrFail({
      where: { username: username },
    });
  }

  async findUserById(userId: number): Promise<any> {
    return await this.usersRepository.findOneOrFail({
      where: { id: userId },
    });
  }
}
