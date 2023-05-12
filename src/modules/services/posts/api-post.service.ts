// import { Inject, Injectable } from '@nestjs/common';
// import { ClientKafka } from '@nestjs/microservices/client';

// //import { OrderCreatedEvent } from './order-created.event';
// import { CreatePostDto } from './post-dto/create-post.dto';

// @Injectable()
// export class ApiGatewayPostService {
//   constructor(@Inject('POST_SERVICE') 
//     private readonly postClient: ClientKafka){}

//   createPost(input: CreatePostDto){
//     this.postClient.emit('post_created',
//     new OrderCreatedEvent('123', userId, price).toString())
//   }
// }
