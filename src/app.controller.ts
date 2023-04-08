import { Body, Controller, Get, Post, Put, Request, } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePostDto } from './modules/posts/create-post.dto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post('create-post')
  // createPost(@Request() req, @Body() createPostDto: CreatePostDto){
  //   this.appService.createPost(req, createpostDto)
  // }

  // @Put('update-post')
  // updatePost(@Body() createOrderDto: any){
  //   this.appService.createOrder(createOrderDto)
  // }


}
