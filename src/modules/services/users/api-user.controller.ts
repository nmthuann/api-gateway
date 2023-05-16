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
import { AuthorizationnGuard } from 'src/common/guards/authorization.guard';
import { CreateInformationDto } from './user-dto/create-information.dto';
import { CreateInformationInterceptor} from 'src/common/interceptors/user-service/create-profile.interceptor';
import { CreateProfileDto } from './user-dto/create-profile.dto';

/**
 *  1. create Information 
 *  2. create Profile
 *  3. get Users
 */

@Controller('user')
export class ApiGatewayUserController {
  constructor(
    private readonly apiGatewayUserService: ApiGatewayUserService,
  ) {}


  @UseGuards(AuthorizationnGuard)
  @Post('create-information')
  @UsePipes(new InformationPipeValidator())
  @UseInterceptors(CreateInformationInterceptor)
  async createInformation(@Request() req: any, @Body() inforDto: CreateInformationDto){
    console.log(`${req['user']} called method`);
    return await this.apiGatewayUserService.createInformation(inforDto, 'create-infor-res');
  }

  @UseGuards(AuthorizationnGuard)
  @Post('create-profile')
  @UseInterceptors(CreateInformationInterceptor)
  async createProfile(@Request() req: any, @Body() profileDto: CreateProfileDto){
    console.log(`${req['user']} called method`);
    return await this.apiGatewayUserService.createProfile(profileDto, 'create-profile-res');
  }

  @UseGuards(RolesGuard)
  @Get('get-users') // -> for Admin
  async getUsers(@Request() req: any){
    console.log(`${req['user']} called method`);
    return await this.apiGatewayUserService.getUsers('getUsers-res');
  }
}


