import { IsEmail, IsNotEmpty } from "class-validator";
import { CreateProfileDto } from "./create-profile.dto";

export class CreateInformationDto{

    // @IsEmail()
    // readonly email: string;

    @IsNotEmpty()
    readonly first_name: string;

    readonly last_name: string;

    readonly gender: string;

    @IsNotEmpty()
    readonly birthday: Date;

    readonly address: string;

    @IsNotEmpty()
    readonly phone: string;

    readonly education: string;

    readonly profile: CreateProfileDto;
}