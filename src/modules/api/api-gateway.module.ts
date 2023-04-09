import { CacheModule, Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { KafkaModule } from 'src/kafka/kafka.module';
//import { AuthProducerService } from '../auth/auth.producer.service';
import { ApiGatewayService } from './api-gateway.service';
import { ProducerService } from 'src/kafka/producer.service';
import * as redisStore from 'cache-manager-redis-store';
@Module({
    imports: [KafkaModule,
        CacheModule.register({
            store: redisStore, 
            host: 'localhost',
            port: 6379,
        }),],
    providers: [ApiGatewayService, ],//AuthProducerService
    controllers: [ApiGatewayController]
})
export class ApiGatewayModule {}