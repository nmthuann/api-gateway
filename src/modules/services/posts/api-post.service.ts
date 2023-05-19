import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices/client';
import { PostDto } from './post-dto/post.dto';
import { ProducerService } from 'src/modules/kafka/producer.service';
import { ConsumerService } from 'src/modules/kafka/consumer.service';
import axios from 'axios';

@Injectable()
export class ApiGatewayPostService {
  constructor(
    // @Inject('POST_SERVICE') 
    // private readonly postClient: ClientKafka,
    // private consumerService: ConsumerService,
  ){}

  async createPost(token: string, postDto: PostDto){
    const url = `http://localhost:8089/post/posts/create`;
    const data = postDto;
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

  async getPosts(token: string){ 
    const url = `http://localhost:8089/post/posts/post-list`;
    try {
      const response = await axios.get(url, {
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




//  async createPost(postDto: PostDto,  resTopic: string){
//     this.postClient.emit('post_created', JSON.stringify(postDto));
//     const postCreated = await this.consumerService.handleMessage<any>('api-gateway', resTopic);
//     return postCreated;
//   }

//   async getPosts(resTopic: string){ 
//     this.postClient.emit('getPosts-req', 'get-list');
//     const posts = await this.consumerService.handleMessage<any>('api-gateway', resTopic);
//     return posts;
//   }