import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiGatewayModule } from 'src/modules/api/api-gateway.module';
import * as redisStore from 'cache-manager-redis-store';
import { ApiGatewayAuthModule } from 'src/modules/services/auth/api-auth.module';
import { ApiGatewayUserModule } from './modules/services/users/api-user.module';
import { ApiGatewayPostModule } from './modules/services/posts/api-post.module';
import { ApiGatewayOrderModule } from './modules/services/orders/api-order.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost', //localhost
      port: 6379, //6379
      // password: 'pqTtSGQM5oHvURGfFWaO7qWcTi3kcWr8',
      ttl: 60 * 60 * 15, // seconds
    }),
    ApiGatewayModule,
    ApiGatewayAuthModule,
    ApiGatewayUserModule,
    ApiGatewayPostModule,
    ApiGatewayOrderModule,
    //ApiGatewayChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// ClientsModule.register([
//   // {
//   //   name: 'ORDER_SERVICE',
//   //   transport: Transport.KAFKA,
//   //   options: {
//   //     client: {
//   //       clientId: 'order',
//   //       brokers: ['localhost:9092'],
//   //     },
//   //     consumer: {
//   //       groupId: 'order-consumer'
//   //     }
//   //   }
//   // },
//   // {
//   //   name: 'POST_SERVICE',
//   //   transport: Transport.KAFKA,
//   //   options: {
//   //     client: {
//   //       clientId: 'post',
//   //       brokers: ['localhost:9092'],
//   //     },
//   //     consumer: {
//   //       groupId: 'post-consumer'
//   //     }
//   //   }
//   // },
//   // {
//   //   name: process.env.AUTH_SERVICE,
//   //   transport: Transport.KAFKA,
//   //   options: {
//   //     client: {
//   //       clientId: process.env.CLIENT_AUTH_ID,
//   //       brokers: [process.env.BROKER_AUTH],
//   //     },
//   //     consumer: {
//   //       groupId: process.env.GROUP_AUTH_ID
//   //     }
//   //   }
//   // }
//   // {
//   // name: 'AUTH_SERVICE',
//   // transport: Transport.KAFKA,
//   // options: {
//   //   client: {
//   //     clientId: 'auth',
//   //     brokers: ['localhost:9092'],
//   //   },
//   //   consumer: {
//   //     groupId: 'auth-consumer'
//   //   }
//   // }
//   // },
// ]),
// CacheModule.register({
//   isGlobal: true,
//   store: typeof redisStore,
//   host: 'redis-17518.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',//localhost
//   port: 17518 ,//6379
//   password: 'pqTtSGQM5oHvURGfFWaO7qWcTi3kcWr8',
//   ttl: 5, // seconds
// }),
