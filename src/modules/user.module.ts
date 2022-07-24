import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { Users } from 'src/entities/user.entity';
import { Keywords } from 'src/entities/keywords.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Keywords])],
  providers: [UserService, AuthService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
