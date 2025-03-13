import { CreateProfileDto } from './create-profile.dto';

export class ProfileDocumentDto {
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  birthday: Date;
  address: string;
  phone: string;
  education: string;
  profileDetail: CreateProfileDto;
}
