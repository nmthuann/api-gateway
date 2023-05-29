import {MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthenticationMiddleware } from 'src/common/middlewares/authentication.middleware';
import { RedisService } from 'src/modules/redis/redis.service';
import { ApiGatewayOrderController } from './api-order.controller';
import { ApiGatewayOrderService } from './api-order.service';
import { JwtModule } from '@nestjs/jwt';
import { AdminRoleGuard } from 'src/common/guards/admin.role.guard';
import { UserRoleGuard } from 'src/common/guards/user.role.guard';

@Module({
    imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: 60},
        }),
    ],
    providers: [ 
        RedisService, 
        ApiGatewayOrderService,
        AdminRoleGuard,
        UserRoleGuard,
    ],
    controllers: [ApiGatewayOrderController]
})
export class ApiGatewayOrderModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthenticationMiddleware)
   .exclude  ({path: '/order/:id/deposit', method: RequestMethod.POST })
    .forRoutes(ApiGatewayOrderController);
  }
}