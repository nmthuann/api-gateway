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
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { CreateInformationDto } from './user-dto/create-information.dto';
import { CreateInformationInterceptor} from 'src/common/interceptors/user-service/create-profile.interceptor';
import { CreateProfileDto } from './user-dto/create-profile.dto';
import { AdminRoleGuard } from 'src/common/guards/admin.role.guard';
import { UserRoleGuard } from 'src/common/guards/user.role.guard';

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


  @UseGuards(UserRoleGuard)
  @Post('create-information')
  @UsePipes(new InformationPipeValidator())
  @UseInterceptors(CreateInformationInterceptor)
  async createInformation(
    @Request() req: any, 
    @Body() inforDto: CreateInformationDto
  ){
    console.log(`${req['user']} called method`);
    const token = req['token'];
    return await this.apiGatewayUserService.createInformation(token, inforDto);
  }


  @UseGuards(UserRoleGuard)
  @Post('create-profile')
  @UseInterceptors(CreateInformationInterceptor)
  async createProfile(@Request() req: any, @Body() profileDto: CreateProfileDto){
    console.log(`${req['user']} called method`);
    const token = req['token'];
    return await this.apiGatewayUserService.createProfile(token, profileDto);
  }

  @UseGuards(AdminRoleGuard)
  @Get('get-users') // -> for Admin
  async getUsers(@Request() req: any){
    console.log(`${req['user']} called method`);
    const token = req['token'];
    return await this.apiGatewayUserService.getUsers(token);
  }
}


