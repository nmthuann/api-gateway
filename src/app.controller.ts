import { Body, Controller, Get, Post, Put, Request } from '@nestjs/common'
import { AppService } from './app.service'
import { Public } from './decorators/public.decorator'

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello()
  }
}
