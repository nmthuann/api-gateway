import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UsePipes,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiGatewayUserService } from './api-user.service';
import { RolesGuard } from 'src/guards/role.guard';
import { InformationPipeValidator } from 'src/pipes/create-information.validator.pipe';
import { CreateInformationDto } from './dtos/create-information.dto';
import { CreateInformationInterceptor } from 'src/interceptors/create-profile.interceptor';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { AdminRoleGuard } from 'src/guards/admin.role.guard';
import { UserRoleGuard } from 'src/guards/user.role.guard';

/**
 *  1. create Information
 *  2. create Profile
 *  3. get Users
 *  4. get-profile-list
 */

@Controller('user')
export class ApiGatewayUserController {
  constructor(private readonly apiGatewayUserService: ApiGatewayUserService) {}

  @UseGuards(RolesGuard)
  @Get('get-user')
  async getUserByEmail(@Request() req: any) {
    const token = req['token'];
    return await this.apiGatewayUserService.getUserByEmail(token);
  }

  @UseGuards(UserRoleGuard)
  @Post('create-information')
  @UsePipes(new InformationPipeValidator())
  @UseInterceptors(CreateInformationInterceptor)
  async createInformation(
    @Request() req: any,
    @Body() inforDto: CreateInformationDto,
  ) {
    console.log(`${req['user']} called method`);
    const token = req['token'];
    return await this.apiGatewayUserService.createInformation(token, inforDto);
  }

  /**
   *
   * @param req
   * @param profileDto
   * @returns
   */

  @UseGuards(UserRoleGuard)
  @Post('create-profile')
  //@UseInterceptors(CreateInformationInterceptor)
  async createProfile(
    @Request() req: any,
    @Body() profileDto: CreateProfileDto,
  ) {
    console.log(`${req['email']} called method`);
    const token = req['token'];
    console.log('profileDto: ', profileDto);
    return await this.apiGatewayUserService.createProfile(token, profileDto);
  }

  @UseGuards(AdminRoleGuard)
  @Get('get-profiles') // -> for Admin
  async getProfileUsers(@Request() req: any) {
    const token = req['token'];
    return await this.apiGatewayUserService.getProfiles(token);
  }
}

// @Get('get-user-profile') // -> for Admin
// async getUser(@Request() req: any){
//   // console.log(`${req['user']} called method`);
//   // const token = req['token'];token
//   return await this.apiGatewayUserService.getProfiles();
// }
