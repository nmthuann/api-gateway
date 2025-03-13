import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { CreateInformationDto } from 'src/modules/services/users/user-dto/create-information.dto'

@Injectable()
export class InformationPipeValidator implements PipeTransform {
  transform(value: CreateInformationDto) {
    if (!value.first_name) {
      throw new BadRequestException('Missing first_name')
    }

    if (value.phone.length < 9) {
      throw new BadRequestException('Phone must be at least 9 characters')
    }

    // Return the validated object
    return value
  }
}
