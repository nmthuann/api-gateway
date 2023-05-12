import { IsEmail, IsNotEmpty } from "class-validator";
import { CreateProfileDto } from "./create-profile.dto";

export class CreateInformationDto{

    @IsEmail()
    email: string;

    @IsNotEmpty()
    first_name: string;

    last_name: string;

    gender: string;

    @IsNotEmpty()
    birthday: Date;

    address: string;

    @IsNotEmpty()
    phone: string;

    education: string;

    profile: CreateProfileDto;
}