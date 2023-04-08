import { Injectable} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService,  } from '@nestjs/axios';
import { LoginUserDto } from '../auth/login.dto';
import { AuthProducerService } from '../auth/auth.producer.service';
import { ProducerService } from 'src/kafka/producer.service';

@Injectable()
export class ApiService {
  constructor(
    //private readonly httpService: HttpService,
    private authProducerService: AuthProducerService,
    //private producerService: ProducerService,
    ) {}

  // getPosts(token: string): Observable<AxiosResponse<any>> {
  //   const headers = { Authorization: `Bearer ${token}` };
  //   return this.httpService.get('/posts', { headers });
  // }

  // createPost(token: string, data: any): Observable<AxiosResponse<any>> {
  //   const headers = { Authorization: `Bearer ${token}` };
  //   return this.httpService.post('/posts', data, { headers });
  // }

  
  // async login_test(loginDto: LoginUserDto){
  //   return this.httpService.post('/http://localhost:3000/auth');
  // }

  async login(loginDto: LoginUserDto){
    // return this.kafkaProducerService.send('login', loginDto);
    return this.authProducerService.login('login',loginDto);
  }
}