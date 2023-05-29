import {MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { KafkaModule } from 'src/modules/kafka/kafka.module';
import { ApiGatewayAuthService } from '../auth/api-auth.service';
import { ApiGatewayAuthController } from './api-auth.controller';
import { AuthenticationMiddleware } from 'src/common/middlewares/authentication.middleware';
import { RedisService } from 'src/modules/redis/redis.service';
import { JWTStrategy } from 'src/common/strategies/jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { UserRoleGuard } from 'src/common/guards/user.role.guard';
import { AdminRoleGuard } from 'src/common/guards/admin.role.guard';
@Module({
    imports: [ 
    // ClientsModule.register([
    // {
    //   name: 'AUTH_SERVICE',
    //   transport: Transport.KAFKA,
    //   options: {
    //     client: {
    //       clientId: 'auth',
    //       brokers: ['localhost:9092'],
    //     },
    //     consumer: {
    //       groupId: 'auth-consumer'
    //     }
    //   }
    //   }]),  
      JwtModule.register({
          secret: process.env.JWT_SECRET_KEY,
          signOptions: { expiresIn: 60},
        }),
        KafkaModule,
    ],
    providers: [
        ApiGatewayAuthService, 
        RedisService,
        UserRoleGuard,
        AdminRoleGuard,
        // JWTStrategy,
        // {
        //   provide: APP_GUARD,
        //   useClass: AuthorizationGuard,
        // }
        
    ],
    controllers: [ApiGatewayAuthController]
})
export class ApiGatewayAuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(AuthenticationMiddleware)     
        .exclude(
          { path: 'auth/login', method: RequestMethod.POST },
          { path: 'auth/register', method: RequestMethod.POST },
          // { path: 'auth/logout', method: RequestMethod.POST },
        )
        .forRoutes(ApiGatewayAuthController)
    }
}