import { Controller, Post, Body, UseGuards, Request, ForbiddenException,
UsePipes } from '@nestjs/common';
// import { JwtAuthGuard } from './jwt-auth.guard';
// import { CreatePostDto } from './create-post.dto';
import { ApiService } from './api.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ValidatorPipe } from 'src/common/pipes/validator.pipe';
import { LoginUserDto } from '../auth/login.dto';
import { Tokens } from 'src/common/bases/types/token.type';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  //handle login
  @Public()
  @Post('login')
  @UsePipes(new ValidatorPipe())
  async login(@Body() loginDto: LoginUserDto) { //: Promise<Tokens>
    console.log(loginDto, "Đã vừa đăng nhập!")
    return await this.apiService.login(loginDto);
  }
}