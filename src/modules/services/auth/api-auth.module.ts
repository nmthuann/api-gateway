import {MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { KafkaModule } from 'src/modules/kafka/kafka.module';
//import * as redisStore from 'cache-manager';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ApiGatewayAuthService } from '../auth/api-auth.service';
import { ApiGatewayAuthController } from './api-auth.controller';
import { AuthenticationMiddleware } from 'src/common/middlewares/authentication.middleware';
import { RedisService } from 'src/modules/redis/redis.service';
//import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// import type { RedisClientOptions } from 'redis';
@Module({
    imports: [KafkaModule, ],//PassportModule
    providers: [ApiGatewayAuthService, RedisService, ],
    controllers: [ApiGatewayAuthController]
})
export class ApiGatewayAuthModule {
}

//     implements NestModule {
//     configure(consumer: MiddlewareConsumer) {
//     consumer
//         .apply(AuthenticationMiddleware)
//         .exclude(
//         { path: 'api/auth/login', method: RequestMethod.POST },
//         { path: 'api/auth/register', method: RequestMethod.POST },
//         //{ path: 'auth/refresh', method: RequestMethod.POST },
//         //'auth/(.*)',
//     )
//         .forRoutes(ApiGatewayAuthController);
//   }