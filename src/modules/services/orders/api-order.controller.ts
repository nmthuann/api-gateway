import { Body, Controller, Get, Post, UseGuards, Request, Param, UseInterceptors } from '@nestjs/common';
import { ApiGatewayOrderService } from './api-order.service';
import { UserRoleGuard } from 'src/common/guards/user.role.guard';
import { AdminRoleGuard } from 'src/common/guards/admin.role.guard';
import { OrderDto } from './order-dto/order.dto';
import { PaymentDTO } from './order-dto/payment.dto';
import { CreateOrderInterceptor } from 'src/common/interceptors/order-service/create-order.intercepter';
import { GetOrderDto } from './order-dto/get-order.dto';

/**
 * 1. Create order
 * 2. cancel Order
 * 3. confirm Order
 * 4. deposit paymet
 * 5. delivery payment
 * 6. payment
 */




@Controller('order')
export class ApiGatewayOrderController {
    constructor(
        private readonly apiGatewayOrderService: ApiGatewayOrderService,
    ) {}


    @UseGuards(UserRoleGuard)
    @Post('create-order')
    // @UseInterceptors(CreateOrderInterceptor)
    async CreateOrder(@Request() req: any, @Body() getOrder: GetOrderDto): Promise<OrderDto>{
        const email = req['email'];
        getOrder.customer_id = email;
        console.log(getOrder);
        return await this.apiGatewayOrderService.createOrder(getOrder);
    }

    @UseGuards(AdminRoleGuard)
    @Get('history-order')
    async ViewHistoryOrder(@Request() req: any){
        const token = req['token']
        return await this.apiGatewayOrderService.viewHistoryOrder(token);
    }


    @UseGuards(UserRoleGuard)
    @Get('find-order/:id')
    async FindOrder(@Request() req: any, @Param(':id') id: number){
        const token = req['token']
        return await this.apiGatewayOrderService.findOrderById(token,  id);
    }


    @UseGuards(UserRoleGuard)
    @Get(':id/confirm')
    async confirmOrder(@Param('id') id: number, @Request() req: any ){
        const token = req['token']
        return await this.apiGatewayOrderService.confirmOrder(token, id);
    }


    @UseGuards(UserRoleGuard)
    @Get(':id/cancel')
    async cancelOrder(@Request() req: any, @Param(':id') id: number){
        const token = req['token']
        return await this.apiGatewayOrderService.cancelOrder(token, id);
    }

    //@UseGuards(UserRoleGuard)
    @Get(':id/deposit')
    async depositPayment(@Param('id') id: number){
        var paymentDto: PaymentDTO = {
            currency: '',
            source: '',
            description: '',
        };
        paymentDto.currency ="usd";
        paymentDto.source = "tok_visa";
        paymentDto.description = "Payment for product XYZ";
        return await this.apiGatewayOrderService.depositPayment(id, paymentDto);
    }

    @UseGuards(UserRoleGuard)
    @Post(':id/delivery')
    async deliveryPayment(@Param('id') id: number, @Request() req: any, @Body() paymentDto: PaymentDTO){
        const token = req['token']
        return await this.apiGatewayOrderService.deliveryPayment(token, id, paymentDto);
    }

    
    @UseGuards(UserRoleGuard)
    @Post(':id/payment')
    async payment(@Param('id') id: number, @Request() req: any, @Body() paymentDto: PaymentDTO){
        const token = req['token']
        return await this.apiGatewayOrderService.payment(token, id, paymentDto);
    }
  
}



// @Post('payment/:id/deposit')
    // async depositPayment(@Body() createOrderDto: any){
    //     return await this.apiGatewayOrderService.depositPayment(createOrderDto);
    // }

    // @Get('find/:id')
    // async findOrder(@Body() createOrderDto: any){
    //     return await this.apiGatewayOrderService.findOrder(createOrderDto);
    // }

    // @Get(':id/cancel')
    // async cancelOrder(@Body() createOrderDto: any){
    //     return await this.apiGatewayOrderService.cancelOrder(createOrderDto);
    // }

    // @Get(':id/confirm')
    // async confirmOrder(@Body() createOrderDto: any){
    //     return await this.apiGatewayOrderService.confirmOrder(createOrderDto);
    // }
