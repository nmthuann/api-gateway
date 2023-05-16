import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices/client';
import { PostDto } from './post-dto/post.dto';
import { ProducerService } from 'src/modules/kafka/producer.service';
import { ConsumerService } from 'src/modules/kafka/consumer.service';

@Injectable()
export class ApiGatewayPostService {
  constructor(
    @Inject('POST_SERVICE') 
    private readonly postClient: ClientKafka,
    private consumerService: ConsumerService,
  ){}

  async createPost(postDto: PostDto,  resTopic: string){
    this.postClient.emit('post_created', JSON.stringify(postDto));
    const postCreated = await this.consumerService.handleMessage<any>('api-gateway', resTopic);
    return postCreated;
  }

  async getPosts(resTopic: string){ 
    this.postClient.emit('getPosts-req', 'get-list');
    const posts = await this.consumerService.handleMessage<any>('api-gateway', resTopic);
    return posts;
  }
}
