import {MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { KafkaModule } from 'src/modules/kafka/kafka.module';
import { ApiGatewayAuthService } from '../auth/api-auth.service';
import { ApiGatewayAuthController } from './api-auth.controller';
import { AuthenticationMiddleware } from 'src/common/middlewares/authentication.middleware';
import { RedisService } from 'src/modules/redis/redis.service';
import { JWTStrategy } from 'src/common/strategies/jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [ 
    ClientsModule.register([
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
      }]),  
      JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: 60},
        }),
        KafkaModule,
    ],
    providers: [
        ApiGatewayAuthService, 
        RedisService,
        // JWTStrategy,
    ],
    controllers: [ApiGatewayAuthController]
})
export class ApiGatewayAuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthenticationMiddleware)
            .exclude(
                { path: 'auth/login', method: RequestMethod.POST },
                { path: 'auth/register', method: RequestMethod.POST },
            )
        .forRoutes(ApiGatewayAuthController);
    }
}