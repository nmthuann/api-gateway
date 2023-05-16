import { Body, Controller, Get, Post, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { ApiGatewayPostService } from './api-post.service';
import { PostDto } from './post-dto/post.dto';
import { AuthorizationnGuard } from 'src/common/guards/authorization.guard';
import { CreatePostInterceptor } from 'src/common/interceptors/post-service/create-post.interceptor';
import { RolesGuard } from 'src/common/guards/role.guard';

/**
 * 1. Create Post -> for Freelancer
 * 2. get Posts -> for Admin
 */

@Controller('post')
export class ApiGatewayPostController {
  constructor(private readonly apiGatewayPostService: ApiGatewayPostService) {}


  @UseGuards(AuthorizationnGuard)
  @Post('create-post')
  @UseInterceptors(CreatePostInterceptor)
  async CreateOrder(@Request() req: any, @Body() postDto: PostDto){
    console.log("post DTo", postDto);
    console.log(`${req['email']} call method`);
    return this.apiGatewayPostService.createPost(postDto, 'create-post-res');
  }

  @UseGuards(RolesGuard)
  @Get('get-posts')
  async getPosts(@Request() req: any){
    console.log(`${req['email']} call method`);
    return await this.apiGatewayPostService.getPosts('getPosts-reqs');
  }
}
