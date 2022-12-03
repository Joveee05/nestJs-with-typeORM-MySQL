import { IsNotEmpty, IsEmail, MinLength, IsLowercase } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsLowercase()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @MinLength(10)
  password: string;
}
