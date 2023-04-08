import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { KafkaModule } from 'src/kafka/kafka.module';
import { AuthProducerService } from '../auth/auth.producer.service';
import { ApiService } from './api.service';
import { ProducerService } from 'src/kafka/producer.service';

@Module({
    imports: [KafkaModule],
    providers: [ApiService, AuthProducerService],
    controllers: [ApiController]
})
export class ApiModule {}