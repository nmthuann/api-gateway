import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { OrderDto } from 'src/modules/services/orders/order-dto/order.dto'

@Injectable()
export class CreateOrderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<OrderDto> {
    const request = context.switchToHttp().getRequest()
    const { body } = request // package_id:, post_id

    if (!body.customerID) {
      body.customer_id = request['email']
    }

    return next.handle()
  }
}
