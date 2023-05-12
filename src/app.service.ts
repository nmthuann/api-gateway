import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService,  } from '@nestjs/axios';

@Injectable()
export class AppService {
  constructor(
  // @Inject('AUTH_SERVICE') 
  // private readonly authClient: ClientKafka,
  // @Inject('USER_SERVICE') 
  // private readonly userClient: ClientKafka,
  // @Inject('POST_SERVICE') 
  // private readonly postClient: ClientKafka,
  // @Inject('ORDER_SERVICE') 
  // private readonly orderClient: ClientKafka,

  // private readonly httpService: HttpService
  ){}


  getHello(): string {
    return 'Hello World!';
  }

  // createOrder({userId, price}: any){
  //   this.postClient.emit('', {})
  // }

  // createPost(token: string, data: CreatePostDto): Observable<AxiosResponse<any>> {
  //   const headers = { Authorization: `Bearer ${token}` };
  //   return this.httpService.post('/posts', data, { headers });
  // }

  
}
