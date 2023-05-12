import { CacheModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ApiGatewayModule} from 'src/modules/apis/api-gateway.module';
import * as redisStore from 'cache-manager-redis-store';
import { ApiGatewayAuthModule } from 'src/modules/services/auth/api-auth.module'
import { ApiGatewayUserModule } from './modules/services/users/api-user.module';

@Module({
  imports: [
    ClientsModule.register([
      // {
      //   name: 'POST_SERVICE',
      //   transport: Transport.KAFKA,
      //   options: {
      //     client: {
      //       clientId: 'post',
      //       brokers: ['localhost:9092'],
      //     },
      //     consumer: {
      //       groupId: 'post-consumer'
      //     }
      //   }
      // },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'auth-consumer'
          }
        }
      }
    ]),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',//localhost
      port: 6379,//6379
      // password: 'pqTtSGQM5oHvURGfFWaO7qWcTi3kcWr8',
      ttl: 60*15, // seconds
    }),
    ApiGatewayModule,
    // ApiGatewayAuthModule,
    ApiGatewayUserModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {
}



//   {
    //     name: 'USER_SERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'user',
    //         brokers: ['localhost:9092'],
    //       },
    //       consumer: {
    //         groupId: 'user-consumer'
    //       }
    //     }
    //   },
    //   {
    
    //   {
    //   name: 'ORDER_SERVICE',
    //   transport: Transport.KAFKA,
    //   options: {
    //     client: {
    //       clientId: 'order',
    //       brokers: ['localhost:9092'],
    //     },
    //     consumer: {
    //       groupId: 'order-consumer'
    //     }
    //   }
    //   },
    // ]),
    // CacheModule.register({
    //   isGlobal: true,
    //   store: typeof redisStore,
    //   host: 'redis-17518.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',//localhost
    //   port: 17518 ,//6379
    //   password: 'pqTtSGQM5oHvURGfFWaO7qWcTi3kcWr8',
    //   ttl: 5, // seconds
    // }), 