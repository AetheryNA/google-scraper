import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { Users } from 'src/entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { UserParams } from 'src/common/types/userParams';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private readonly entityManager: EntityManager,
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
}
