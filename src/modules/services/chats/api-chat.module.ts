import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ApiGatewayChatService } from './api-chat.service';
import { AdminRoleGuard } from 'src/guards/admin.role.guard';
import { UserRoleGuard } from 'src/guards/user.role.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { ApiGatewayChatController } from './api-chat.controller';
import { AuthenticationMiddleware } from 'src/middlewares/authentication.middleware';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 60 },
    }),
  ],
  providers: [ApiGatewayChatService, AdminRoleGuard, UserRoleGuard, RolesGuard],
  controllers: [ApiGatewayChatController],
})
export class ApiGatewayChatModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      //.exclude  ({path: '/order/:id/deposit', method: RequestMethod.POST })
      .forRoutes(ApiGatewayChatController);
  }
}
