import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
  Param,
  Put,
} from '@nestjs/common';
import { ApiGatewayPostService } from './api-post.service';
import { PostDto } from './dtos/post.dto';
import { CreatePostInterceptor } from 'src/interceptors/create-post.interceptor';
import { AdminRoleGuard } from 'src/guards/admin.role.guard';
import { UserRoleGuard } from 'src/guards/user.role.guard';
import { CategoryDto } from './dtos/category.dto';

/**
 * 1. Create Post -> User
 * 2. get Posts -> public
 * 3. get categories -> both
 * 4. create-category -> Admin
 * 5. update-category/:id -> Admin
 */

@Controller('post')
export class ApiGatewayPostController {
  constructor(private readonly apiGatewayPostService: ApiGatewayPostService) {}

  @UseGuards(UserRoleGuard)
  @Post('create-post')
  @UseInterceptors(CreatePostInterceptor)
  async CreatePost(@Request() req: any, @Body() postDto: PostDto) {
    const token = req['token'];
    return this.apiGatewayPostService.createPost(token, postDto);
  }

  @UseGuards(UserRoleGuard)
  @Put('update-post/:id')
  async updatePost(
    @Param('id') id: number,
    @Request() req: any,
    @Body() postDto: PostDto,
  ): Promise<PostDto> {
    const token = req['token'];
    return this.apiGatewayPostService.updatePost(token, id, postDto);
  }

  // @Public()
  @Get('get-posts')
  async getPosts() {
    //@Request() req: any
    // const token = req['token']
    return await this.apiGatewayPostService.getPosts();
  }

  // @UseGuards(RolesGuard)
  @Get('get-categories')
  async getCategory() {
    //@Request() req: any
    // const token = req['token']
    return await this.apiGatewayPostService.getCategories();
  }

  @UseGuards(AdminRoleGuard)
  @Post('create-category')
  async createCategory(@Request() req: any, @Body() categoryDto: CategoryDto) {
    const token = req['token'];
    return await this.apiGatewayPostService.createCategory(token, categoryDto);
  }

  @UseGuards(AdminRoleGuard)
  @Post('update-category/:id')
  async updateCategoryById(
    @Request() req: any,
    @Param('id') id: number,
    @Body() categoryDto: CategoryDto,
  ) {
    const token = req['token'];
    return await this.apiGatewayPostService.updateCategoryById(
      token,
      id,
      categoryDto,
    );
  }

  @Get('get-category/:id')
  async getCategoryById(@Request() req: any, @Param('id') id: number) {
    const token = req['token'];
    return await this.apiGatewayPostService.getCategoryById(token, id);
  }

  @Get('category-detail-list/:id')
  async getCategoryDetailsByCategoryId(@Param('id') id: number) {
    // const token = req['token']
    return await this.apiGatewayPostService.getCategoryDetailsByCategoryId(id);
  }

  // @UseGuards(UserRoleGuard)
  @Get('get-category-details')
  async getCategoryDetails() {
    //const token = req['token']
    return await this.apiGatewayPostService.getCategoryDetails();
  }

  @Get('get-posts/:id')
  async getPostsByCategoryDetailId(@Param('id') id: number) {
    // const token = req['token']
    return await this.apiGatewayPostService.getPostsByCategoryDetailId(id);
  }

  @Get('get-post/:id')
  async getPostById(@Param('id') id: number) {
    // const token = req['token']
    return await this.apiGatewayPostService.getPostById(id);
  }

  @UseGuards(UserRoleGuard)
  @Get('get-post-user')
  async getPostByEmail(@Request() req: any) {
    const token = req['token'];
    return await this.apiGatewayPostService.getPostByEmail(token);
  }
}

// @UseGuards(AdminRoleGuard)
// @POST('get-categories')
// async getCategory(@Request() req: any){
//   const token = req['token']
//   return await this.apiGatewayPostService.getCategories(token);
// }
