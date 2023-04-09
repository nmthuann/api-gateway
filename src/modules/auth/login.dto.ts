import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDto {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    // constructor(
    //     email: string,
    //     password: string,){}

    toString(){
        return JSON.stringify({
            email: this.email,
            password: this.password
        })
    }
}

/**
 * test input đầu vào
 */