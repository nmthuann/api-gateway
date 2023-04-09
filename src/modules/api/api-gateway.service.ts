import {  CACHE_MANAGER, Inject, Injectable} from '@nestjs/common';
import { LoginUserDto } from '../auth/login.dto';
import { ProducerService } from 'src/kafka/producer.service';
import { Kafka, logLevel } from 'kafkajs';
import { ConsumerService } from 'src/kafka/consumer.service';
import { Tokens } from 'src/common/bases/types/token.type';
import { TokensDto } from '../auth/tokens.dto';
import { Cache } from 'cache-manager';


@Injectable()
export class ApiGatewayService {
  constructor(
    private producerService: ProducerService,
    private consumerService: ConsumerService,
    @Inject(CACHE_MANAGER) private cacheService: Cache) {}

    async login(topic: string, message: LoginUserDto){//: Promise<Tokens>
      await this.producerService.onModuleInit();
        await this.producerService.produce({
            topic: 'auth-login',
            messages: [{value:message.toString()}],// có thể lỗi ở đây
            timeout: 6000 //6ms*1000 = 6s
        });
        console.log('.....................ĐÃ SEND!');
        // close connect producer
        await this.producerService.onApplicationShutdown();

        //************************************************************* */
        
        const output_Tokens = new Promise<TokensDto>((resolve) =>{
        this.consumerService.consume(
          'api-gateway',
          {topic: topic},
          {
            eachMessage: async ({ message }) => {
              const inputTokens = await JSON.parse(message.value.toString());
              console.log('input tokens: ',inputTokens);
              resolve(inputTokens);
            }
          }) 

          // close connect consumer
          this.consumerService.onApplicationShutdown();
        })

      await this.cacheService.set(message.email, (await output_Tokens).access_token, 60000 )
      return output_Tokens;
    }

    // async saveAccessToken(token: string, expiresIn: number) {
      
    // //redisService.getClient().set(token, 'valid', 'EX', expiresIn);
    // }

    async getDataInCach(email: string): Promise<string> {
    // check if data is in cache:
    const cachedData = await this.cacheService.get<{ access_Tokens: string }>(
      email.toString(),
    );
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return `${cachedData.access_Tokens}`;
    }

    return 'Khong ton tại';
  }
  
}















// getPosts(token: string): Observable<AxiosResponse<any>> {
  //   const headers = { Authorization: `Bearer ${token}` };
  //   return this.httpService.get('/posts', { headers });
  // }

  // createPost(token: string, data: any): Observable<AxiosResponse<any>> {
  //   const headers = { Authorization: `Bearer ${token}` };
  //   return this.httpService.post('/posts', data, { headers });
  // }