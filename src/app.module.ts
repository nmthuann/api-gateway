import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ApiModule } from './modules/api/api.module';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'AUTH_SERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'auth',
    //         brokers: ['localhost:9092'],
    //       },
    //       consumer: {
    //         groupId: 'auth-consumer'
    //       }
    //     }
    //   },
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
    //     name: 'POST_SERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'post',
    //         brokers: ['localhost:9092'],
    //       },
    //       consumer: {
    //         groupId: 'post-consumer'
    //       }
    //     }
    //   },
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
   ApiModule],
  controllers: [AppController],
  providers: [AppService,],// ConsumerService, ProducerService
})
export class AppModule {}
