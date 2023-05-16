import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices/client';
// import { OrderCreatedEvent } from './order-dto/create-order.dto';
import { OrderDto } from './order-dto/order.dto';

//import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class ApiGatewayOrderService {
  constructor(
    @Inject('ORDER_SERVICE') 
    private readonly orderClient: ClientKafka,
    
  ){}

    async createOrder(orderDto: OrderDto){
        // this.orderClient.emit('order_created', JSON.stringify(orderDto))
        throw new HttpException('method is not complete', HttpStatus.FORBIDDEN);
    }

    async findOrder(orderDto: OrderDto){
        // this.orderClient.emit('order_created', JSON.stringify(orderDto))
        throw new HttpException('method is not complete', HttpStatus.FORBIDDEN);
    }

    async cancelOrder(orderDto: OrderDto){
        // this.orderClient.emit('order_created', JSON.stringify(orderDto))
        throw new HttpException('method is not complete', HttpStatus.FORBIDDEN);
    }

    async confirmOrder(orderDto: OrderDto){
        // this.orderClient.emit('order_created', JSON.stringify(orderDto))
        throw new HttpException('method is not complete', HttpStatus.FORBIDDEN);
    }

    async depositPayment(orderDto: OrderDto){
        // this.orderClient.emit('order_created', JSON.stringify(orderDto))
        throw new HttpException('method is not complete', HttpStatus.FORBIDDEN);
    }
}
