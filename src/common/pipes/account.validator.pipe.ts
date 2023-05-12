import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { AccountDto } from 'src/modules/services/auth/auth-dto/Account.dto';

@Injectable()
export class AccountPipeValidator implements PipeTransform {
  transform(value: AccountDto) {
    if (!value.email) {
      throw new BadRequestException('Missing email');
    }

    if (!value.password) {
      throw new BadRequestException('Missing password');
    }

    if (value.password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters');
    }

    // Return the validated object
    return value;
  }
}