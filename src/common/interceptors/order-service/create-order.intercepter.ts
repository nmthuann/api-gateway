import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderDto } from 'src/modules/services/orders/order-dto/order.dto';

@Injectable()
export class CreateOrderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<OrderDto> {
    const request = context.switchToHttp().getRequest();
    const { body } = request;  // package_id:, post_id

    if (!body.customerID) {
      body.customer_id = request['email'];
    }


    return next.handle();
  }
}


// export class OrderDto{
//     public id: number;
//     public customerID: number;
//     public jobPostID: number;
//     public FreelancerID: number;
//     public createTime: Date;
//     public deliveryTime: number;
//     public totalPrice: number;
//     public status: string;
//     public timeStart: Date;
//     public timeEnd: Date;
// }