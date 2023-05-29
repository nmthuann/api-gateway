import {  CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import { AccountDto } from './auth-dto/account.dto';
import { Cache } from 'cache-manager';
import axios from 'axios';

/**
 * 1. login
 * 2. Register
 * 3. Logout
 */

@Injectable()
export class ApiGatewayAuthService {

  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}    

  public async login(inputLogin: AccountDto){
    const url = `http://localhost:8088/user/auth/login`;
    const data = inputLogin;
    try {
      const response = await axios.post(url, data);
      // console.log(response.data)
      if (await response.data['message'] == 'password wrong')
        return new HttpException({ message: 'Please Login again!' }, HttpStatus.FORBIDDEN);
      await this.cacheService.set(inputLogin.email, response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async register(input: AccountDto){
    const url = `http://localhost:8088/user/auth/register`;
    const data = input;
    try {
      const response = await axios.post(url, data);
      await this.cacheService.set(input.email, response['data']);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async logout(token:string, email: string){
    await this.cacheService.del(email);
    const url = `http://localhost:8088/user/auth/logout`;
    const data = email;
    try {
      const response = await axios.post(url, data, {
         headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

}






  // async login(resTopic: string, inputLogin: AccountDto){
  //   // publish a producer - send message to service
  //   await this.producerService.sendMessage('api-auth-login', inputLogin, 5000);

  //   // get access token from AuthService
  //   const tokens = 
  //   await this.consumerService.handleMessage<Tokens | object | string>('api-gateway', resTopic);

  //   // set cache
  //   await this.cacheService.set(inputLogin.email, tokens);
  //   return tokens;
  // }


  // async register(resTopic: string, input: AccountDto){
  //   // publish a producer - send message to service
  //   await this.producerService.sendMessage('api-auth-register-req', input, 60000);

  //   // get access token
  //   const tokens = await this.consumerService.handleMessage<any>('api-gateway', resTopic);

  //   // set cache
  //   await this.cacheService.set(input.email, tokens);
  //   return tokens;
  // }


























  // async login(topic: string, login: LoginUserDto){
  //     await this.producerService.onModuleInit();
  //     await this.producerService.produce({
  //       topic: 'api-auth-login-req',
  //       messages: [{value:login.toString()}],
  //       timeout: 6000 
  //     });
  //     // close connect producer
  //     await this.producerService.onApplicationShutdown(); 

  //     // Consumer
  //     const responseTokens = new Promise<TokensDto>( (resolve, reject) =>{// async
  //       try {
  //         //await 
  //         this.consumerService.consume(
  //           'api-gateway',
  //           {topic: topic},
  //           {
  //             eachMessage: async ({ message }) => {
  //               const inputTokens = await JSON.parse(message.value.toString());
  //               console.log('input tokens: ', inputTokens);

  //               resolve(inputTokens);
  //             }
  //           }
  //         );
  //         // close connect consumer
  //         this.consumerService.onApplicationShutdown();
  //       } catch (error) {
  //         reject(error);
  //       }
  //     });
  //   await this.cacheService.set(login.email, (await responseTokens).access_token)
  //   return responseTokens;
  // }