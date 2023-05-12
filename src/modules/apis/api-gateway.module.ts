import {Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
@Module({
    //imports: [KafkaModule],
    providers: [ApiGatewayService],//AuthProducerService
    controllers: [ApiGatewayController]
})
export class ApiGatewayModule {}