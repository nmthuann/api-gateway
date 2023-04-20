import { Controller, Post, Body, UseGuards, Request, ForbiddenException,
UsePipes, 
Get,
Param,
UseInterceptors,
HttpCode,
HttpStatus,
NestMiddleware} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { ValidatorPipe } from 'src/common/pipes/validator.pipe';
import { LoginUserDto } from './auth-dto/login.dto';
import { Tokens } from 'src/common/bases/types/token.type';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiGatewayAuthService } from '../auth/api-auth.service';
import { TransformPipe } from 'src/common/pipes/transform.pipe';
import { CreateAccountUserDto } from './auth-dto/create-accountUser.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { RefreshGuard } from 'src/common/guards/refresh-token.guard';
import { AuthenticationMiddleware } from 'src/common/middlewares/authentication.middleware';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';
import { NextFunction } from 'express';

@Controller('auth')
export class ApiGatewayAuthController {
  constructor(private readonly apiGatewayAuthService: ApiGatewayAuthService,
    // private readonly jwtService: JwtService,
    // private readonly redisService: RedisService
    ) {}

  //handle login
  @Public()
  @Post('login')
  @UsePipes(new ValidatorPipe())
  async login(@Body() loginDto: LoginUserDto){
    console.log(loginDto, "Đã vừa đăng nhập!")
    return await this.apiGatewayAuthService.login('auth-api-login-res', loginDto);
  }

  // //fucntion register user
  // @Public()
  // @Post('register') // check login hoặc chưa
  // @UsePipes(new TransformPipe())
  // @HttpCode(HttpStatus.CREATED)
  // async registerUser(@Body() input: CreateAccountUserDto): Promise<Tokens> {
  //   return await this.apiGatewayAuthService.register('auth-api-register-res', input);
  // }
  

  // @UseGuards(AuthenticationGuard)
  // @Post('logout')
  // @HttpCode(HttpStatus.OK)
  // async logout(@Request() req: any, res: Response, next: NextFunction): Promise<boolean>{
  //   const token = req.get('authorization').replace('Bearer', '').trim();
  //   console.log("midddleware-token: ",token);
  //   const tokenMatch = this.jwtService.decode(token);
  //   const currentUser = tokenMatch['email']; // check here
  //   await this.redisService.delete(currentUser);
  //   return await this.apiGatewayAuthService.logout('auth-api-logout-res', currentUser);
  // }

  // @Public()
  // @UseGuards(RefreshGuard) // để ngăn ng khác thay đổi rf
  // @Post('refresh')
  // @HttpCode(HttpStatus.OK)
  // refreshToken(
  //   @GetCurrentEmailUser() email: string,
  //   @GetCurrentUser('refreshToken') refreshToken: string,
  // ): Promise<Tokens> {
  //   console.log({
  //     email,
  //     refreshToken
  //   })
  //   return this.authService.refreshTokenold(email, refreshToken);
  // }  
  
  // @Post('forgetPassword/:email')
  // forgetPassword(@Param('email') email: string){
  //   console.log("You choose the forgetPassword func!")
  //   //return this.apiGatewayAuthService.forgetPassword('auth-api-forget-password-res', );
  // }


}
