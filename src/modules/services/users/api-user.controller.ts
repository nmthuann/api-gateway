import { Controller, Post, Body, UseGuards, Request, ForbiddenException,
UsePipes, 
Get,
Param,
UseInterceptors,
HttpCode,
HttpStatus,
NestMiddleware,
ValidationPipe} from '@nestjs/common';
import { AccountPipeValidator } from 'src/common/pipes/account.validator.pipe';
import { ApiGatewayUserService } from './api-user.service';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CreateAccountUserDto } from '../auth/auth-dto/create-accountUser.dto';
import { InformationPipeValidator } from 'src/common/pipes/user-service/create-information.validator.pipe';



@Controller('user')
export class ApiGatewayUserController {
  constructor(private readonly apiGatewayUserService: ApiGatewayUserService,
    // private readonly jwtService: JwtService,
    // private readonly redisService: RedisService
  ) {}


  @Post('create-information')
  @UseGuards(RolesGuard)
  @UsePipes(new InformationPipeValidator())
  async createInformation(@Request() req: any, @Body() input: CreateAccountUserDto){
    console.log(req['user']);
    return input;
  }

  @Post('create-profile')
  @UseGuards(RolesGuard)
  async createProfile(@Body() input: any){
    return input;
  }
}


