import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiGatewayOrderService } from './api-order.service';

@Controller('order')
export class ApiGatewayOrderController {
  constructor(
    private readonly apiGatewayOrderService: ApiGatewayOrderService
    ) {}


    @Post('create-order')
    async CreateOrder(@Body() createOrderDto: any){
        // return this.apiGatewayOrderService.createOrder(createOrderDto);
        return await this.apiGatewayOrderService.createOrder(createOrderDto);
    }

    @Post('payment/:id/deposit')
    async depositPayment(@Body() createOrderDto: any){
        return await this.apiGatewayOrderService.depositPayment(createOrderDto);
    }

    @Get('find/:id')
    async findOrder(@Body() createOrderDto: any){
        return await this.apiGatewayOrderService.findOrder(createOrderDto);
    }

    @Get(':id/cancel')
    async cancelOrder(@Body() createOrderDto: any){
        return await this.apiGatewayOrderService.cancelOrder(createOrderDto);
    }

    @Get(':id/confirm')
    async confirmOrder(@Body() createOrderDto: any){
        return await this.apiGatewayOrderService.confirmOrder(createOrderDto);
    }

  
}
