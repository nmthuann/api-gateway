import { Controller, Post, Body, UseGuards, Request, ForbiddenException,
UsePipes, 
Get,
Param,
UseInterceptors,
HttpCode,
HttpStatus,
NestMiddleware,
ValidationPipe} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { ValidatorPipe } from 'src/common/pipes/validator.pipe';
import { AccountDto } from './auth-dto/account.dto';
import { ApiGatewayAuthService } from '../auth/api-auth.service';
import { AccountPipeValidator } from 'src/common/pipes/account.validator.pipe';
import { AuthorizationnGuard } from 'src/common/guards/authorization.guard';

/**
 * 1. POST/auth/login -> login
 * 2. POST/auth/register -> register
 * 3. POST/auth/logout -> logout
 */


@Controller('auth')
export class ApiGatewayAuthController {
  constructor(
    private readonly apiGatewayAuthService: ApiGatewayAuthService,
    // private readonly jwtService: JwtService,
    // private readonly redisService: RedisService
  ) {}

  @Public()
  @Post('login')
  @UsePipes(new AccountPipeValidator())
  async login(@Body() loginDto: AccountDto){
    console.log("Check account .... ", loginDto);
    return await this.apiGatewayAuthService.login('auth-api-login-res', loginDto);
  }


  @Public()
  @Post('register')
  @UsePipes(new AccountPipeValidator())  // new TransformPipe()
  async register(@Body() accountDto: AccountDto){
    return await this.apiGatewayAuthService.register('auth-api-register-res', accountDto);
  }

  
  @UseGuards(AuthorizationnGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Request() req: any){
    const checkStatus =  await this.apiGatewayAuthService.logout(req['email']);
    if (checkStatus)  
      return {
        message: "you are logged out",
        status: 204
      };
    return {message: 404};
  }
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
