import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { AuthenticationMiddleware } from 'src/middlewares/authentication.middleware'
import { KafkaModule } from 'src/modules/kafka/kafka.module'
import { RedisService } from 'src/modules/redis/redis.service'
import { ApiGatewayPostController } from './api-post.controller'
import { ApiGatewayPostService } from './api-post.service'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { RolesGuard } from 'src/guards/role.guard'
import { AdminRoleGuard } from 'src/guards/admin.role.guard'
import { UserRoleGuard } from 'src/guards/user.role.guard'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 60 }
    }),
    KafkaModule
  ],
  providers: [
    // {
    //     provide: APP_GUARD,
    //     useClass: RolesGuard,
    // },
    RedisService,
    ApiGatewayPostService,
    AdminRoleGuard,
    UserRoleGuard
  ],
  controllers: [ApiGatewayPostController]
})
export class ApiGatewayPostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude(
        { path: '/post/get-posts', method: RequestMethod.GET },
        { path: '/post/get-categories', method: RequestMethod.GET },
        { path: '/post/category-detail-list/:id', method: RequestMethod.GET },
        { path: '/post/get-posts/:id', method: RequestMethod.GET },
        { path: '/post/get-post/:id', method: RequestMethod.GET },
        { path: '/post/get-category-details', method: RequestMethod.GET }
      )
      .forRoutes(ApiGatewayPostController)
  }
}
