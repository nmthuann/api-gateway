import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthenticationMiddleware } from 'src/middlewares/authentication.middleware';
import { ApiGatewayOrderController } from './api-order.controller';
import { ApiGatewayOrderService } from './api-order.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 60 },
    }),
  ],
  providers: [ApiGatewayOrderService],
  controllers: [ApiGatewayOrderController],
})
export class ApiGatewayOrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude({ path: '/order/:id/deposit', method: RequestMethod.POST })
      .forRoutes(ApiGatewayOrderController);
  }
}
