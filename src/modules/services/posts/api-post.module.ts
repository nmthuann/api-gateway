import {MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthenticationMiddleware } from 'src/common/middlewares/authentication.middleware';
import { KafkaModule } from 'src/modules/kafka/kafka.module';
import { RedisService } from 'src/modules/redis/redis.service';
import { ApiGatewayPostController } from './api-post.controller';
import { ApiGatewayPostService } from './api-post.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/role.guard';

@Module({
    imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: 60},
        }),
        KafkaModule, 
    ],
    providers: [ 
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        RedisService, 
        ApiGatewayPostService,
    ],
    controllers: [ApiGatewayPostController]
})
export class ApiGatewayPostModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(AuthenticationMiddleware)
    .forRoutes(ApiGatewayPostController);
  }
}