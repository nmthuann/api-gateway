import {  CACHE_MANAGER, Inject, Injectable} from '@nestjs/common';
import { AccountDto } from './auth-dto/account.dto';
import { ProducerService } from 'src/modules/kafka/producer.service';
import { Kafka, logLevel } from 'kafkajs';
import { ConsumerService } from 'src/modules/kafka/consumer.service';
import { Tokens } from 'src/modules/bases/types/token.type';
import { TokensDto } from './auth-dto/tokens.dto';
import { Cache } from 'cache-manager';
import { RefreshDto } from './auth-dto/refresh.dto';
import { throwError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

/**
 * 2. Register
 * 3. Logout
 */

@Injectable()
export class ApiGatewayAuthService {
  constructor(
    private producerService: ProducerService,
    private consumerService: ConsumerService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}    


  //  decode token
  async decodeToken(token: string){
    const decode_token = this.jwtService.decode(token);
    console.log("decode: ", decode_token);
    return await decode_token['email'];
  }


  async checkRole(){
    return;
  }


  async login(resTopic: string, inputLogin: AccountDto){
    // publish a producer - send message to service
    await this.producerService.sendMessage('api-auth-login-req', inputLogin, 60000);

    // get access token from AuthService
    const tokens = 
    await this.consumerService.handleMessage<Tokens | object | any | string>('api-gateway', resTopic);

    // set cache
    await this.cacheService.set(inputLogin.email, tokens);
    return tokens;
  }


  async register(resTopic: string, input: AccountDto){
    // publish a producer - send message to service
    await this.producerService.sendMessage('api-auth-login-req', input, 60000);

    // get access token
    const tokens = await this.consumerService.handleMessage<any>('api-gateway', resTopic);

    // set cache
    await this.cacheService.set(input.email, tokens);
    return tokens;
  }

}


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