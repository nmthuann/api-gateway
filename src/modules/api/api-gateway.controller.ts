import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('api')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get('get-cache')
  @UseInterceptors(CacheInterceptor)
  async getDataInCaching() {
    return await this.apiGatewayService.getDataInCaching();
  }

  @Get('set-cache')
  @UseInterceptors(CacheInterceptor)
  async setDataInCaching() {
    return await this.apiGatewayService.setDataInCaching();
  }

  @Get('/:email')
  @UseInterceptors(CacheInterceptor)
  async getCacheUser(@Param('email') email: string) {
    console.log(email);
    return await this.apiGatewayService.getCacheUser(email);
  }
}
