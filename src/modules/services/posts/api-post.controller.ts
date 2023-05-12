// import { Body, Controller, Get, Post } from '@nestjs/common';
// import { ApiGatewayPostService } from './api-post.service';
// import { CreatePostDto } from './post-dto/create-post.dto';

// @Controller()
// export class ApiGatewayPostController {
//   constructor(private readonly apiGatewayPostService: ApiGatewayPostService) {}


//   @Post('create-post')
//   async CreateOrder(@Body() createPostDto: CreatePostDto){
//     console.log(createPostDto.job_post_detail.profile_name, "Create Post Controller!")
//     return this.apiGatewayPostService.createPost(createPostDto)
//   }
// }
