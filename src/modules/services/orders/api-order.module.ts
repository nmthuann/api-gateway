import {MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthenticationMiddleware } from 'src/common/middlewares/authentication.middleware';
import { KafkaModule } from 'src/modules/kafka/kafka.module';
import { RedisService } from 'src/modules/redis/redis.service';
import { ApiGatewayOrderController } from './api-order.controller';
import { ApiGatewayOrderService } from './api-order.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/role.guard';

@Module({
    imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: 60},
        }),
    ],
    // KafkaModule, 
    providers: [ 
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        RedisService, 
        ApiGatewayOrderService,
    ],
    controllers: [ApiGatewayOrderController]
})
export class ApiGatewayOrderModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(AuthenticationMiddleware)
    .forRoutes(ApiGatewayOrderController);
  }
}