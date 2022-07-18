import { IsString, Length, IsNotEmpty } from 'class-validator';

export class RegisterUser {
  @IsString()
  @Length(5, 25)
  @IsNotEmpty()
  username: string;

  @IsString()
  @Length(8, 25)
  @IsNotEmpty()
  password: string;
}
