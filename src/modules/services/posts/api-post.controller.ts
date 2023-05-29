import { Body, Controller, Get, Post, UseGuards, UseInterceptors, Request, Param } from '@nestjs/common';
import { ApiGatewayPostService } from './api-post.service';
import { PostDto } from './post-dto/post.dto';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { CreatePostInterceptor } from 'src/common/interceptors/post-service/create-post.interceptor';
import { RolesGuard } from 'src/common/guards/role.guard';
import { AdminRoleGuard } from 'src/common/guards/admin.role.guard';
import { UserRoleGuard } from 'src/common/guards/user.role.guard';
import { CategoryDto } from './category-dto/category.dto';
import { Public } from 'src/common/decorators/public.decorator';

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
  async CreateOrder(@Request() req: any, @Body() postDto: PostDto){
    const token = req['token'];
    return this.apiGatewayPostService.createPost(token, postDto);
  }

  // @Public()
  @Get('get-posts')
  async getPosts(){ //@Request() req: any
    // const token = req['token']
    return await this.apiGatewayPostService.getPosts();
  }


  // @UseGuards(RolesGuard)
  @Get('get-categories')
  async getCategory(){  //@Request() req: any
    // const token = req['token']
    return await this.apiGatewayPostService.getCategories();
  }

  @UseGuards(AdminRoleGuard)
  @Post('create-category')
  async createCategory(@Request() req: any, @Body() categoryDto: CategoryDto){
    const token = req['token']
    return await this.apiGatewayPostService.createCategory(token, categoryDto);
  }

  @UseGuards(AdminRoleGuard)
  @Post('update-category/:id')
  async updateCategoryById(
    @Request() req: any, 
    @Param('id') id: number, 
    @Body() categoryDto: CategoryDto
  ){
    const token = req['token']
    return await this.apiGatewayPostService.updateCategoryById(token, id, categoryDto);
  }

  @Get('get-category/:id')
  async getCategoryById(@Request() req: any, @Param('id') id: number){
    const token = req['token']
    return await this.apiGatewayPostService.getCategoryById(token, id);
  }

  @Get('category-detail-list/:id')
  async getCategoryDetailsByCategoryId(@Param('id') id: number){
    // const token = req['token']
    return await this.apiGatewayPostService.getCategoryDetailsByCategoryId(id);
  }

  // @UseGuards(UserRoleGuard)
  @Get('get-category-details')
  async getCategoryDetails(@Request() req: any){
    //const token = req['token']
    return await this.apiGatewayPostService.getCategoryDetails();
  }

  @Get('get-posts/:id')
  async getPostsByCategoryDetailId(@Param('id') id: number){
    // const token = req['token']
    return await this.apiGatewayPostService.getPostsByCategoryDetailId(id);
  }

  @Get('get-post/:id')
  async getPostById(@Param('id') id: number){
    // const token = req['token']
    return await this.apiGatewayPostService.getPostById(id);
  }


  @UseGuards(UserRoleGuard)
  @Get('get-post-user')
  async getPostByEmail(@Request() req: any){
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