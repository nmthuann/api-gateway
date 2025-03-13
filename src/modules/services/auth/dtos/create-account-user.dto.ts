import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateAccountUserDto {
  // giá trị mặc định
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
