import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthenticationMiddleware } from 'src/middlewares/authentication.middleware';
import { KafkaModule } from 'src/modules/kafka/kafka.module';
import { RedisService } from 'src/modules/redis/redis.service';
import { ApiGatewayUserController } from './api-user.controller';
import { ApiGatewayUserService } from './api-user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 60 },
    }),
    KafkaModule,
  ],
  providers: [
    // {
    //     provide: APP_GUARD,
    //     useClass: RolesGuard,
    // },
    RedisService,
    ApiGatewayUserService,
  ],
  controllers: [ApiGatewayUserController],
})
export class ApiGatewayUserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(ApiGatewayUserController);
  }
}
