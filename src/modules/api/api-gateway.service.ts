import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class ApiGatewayService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheService: Cache) {}

  async setDataInCaching() {
    await this.cacheService.set('test', 'hello');
    return true;
  }

  async getDataInCaching() {
    return await this.cacheService.get('test');
  }

  async getCacheUser(email: string) {
    // check if data is in cache:
    const cachedData = await this.cacheService.get(email);
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return `${cachedData} của ${email} da dang nhap`;
    } else {
      return `${email} chua dang nhap`;
    }
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
