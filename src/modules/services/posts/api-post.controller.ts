import { Body, Controller, Get, Post, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { ApiGatewayPostService } from './api-post.service';
import { PostDto } from './post-dto/post.dto';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { CreatePostInterceptor } from 'src/common/interceptors/post-service/create-post.interceptor';
import { RolesGuard } from 'src/common/guards/role.guard';
import { AdminRoleGuard } from 'src/common/guards/admin.role.guard';
import { UserRoleGuard } from 'src/common/guards/user.role.guard';

/**
 * 1. Create Post -> for Freelancer
 * 2. get Posts -> for Admin
 */

@Controller('post')
export class ApiGatewayPostController {
  constructor(private readonly apiGatewayPostService: ApiGatewayPostService) {}


  @UseGuards(UserRoleGuard)
  @Post('create-post')
  @UseInterceptors(CreatePostInterceptor)
  async CreateOrder(@Request() req: any, @Body() postDto: PostDto){
    const token = req['token'];
    return this.apiGatewayPostService.createPost(token, postDto);
  }

  @UseGuards(AdminRoleGuard)
  @Get('get-posts')
  async getPosts(@Request() req: any){
    const token = req['token']
    return await this.apiGatewayPostService.getPosts(token);
  }
}
