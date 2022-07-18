import { IsString, Length } from 'class-validator';

export class RegisterUser {
  @IsString()
  @Length(5, 25)
  username: string;

  @IsString()
  @Length(8, 25)
  password: string;
}
