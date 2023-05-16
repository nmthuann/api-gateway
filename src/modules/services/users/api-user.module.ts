import {MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthenticationMiddleware } from 'src/common/middlewares/authentication.middleware';
import { KafkaModule } from 'src/modules/kafka/kafka.module';
import { RedisService } from 'src/modules/redis/redis.service';
import { ApiGatewayUserController } from './api-user.controller';
import { ApiGatewayUserService } from './api-user.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/role.guard';
import { JWTStrategy } from 'src/common/strategies/jwt.strategy';

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
        ApiGatewayUserService,
        //JWTStrategy,
    ],
    controllers: [ApiGatewayUserController]
})
export class ApiGatewayUserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthenticationMiddleware)
        .forRoutes(ApiGatewayUserController);
    }
}