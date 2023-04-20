import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class CreateAccountUserDto {
    // giá trị mặc định
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}