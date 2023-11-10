import { Body, Controller, Get, Post, UseGuards, Request, Param, UseInterceptors } from '@nestjs/common';
import { ApiGatewayOrderService } from './api-order.service';
import { UserRoleGuard } from 'src/common/guards/user.role.guard';
import { AdminRoleGuard } from 'src/common/guards/admin.role.guard';
import { OrderDto } from './order-dto/order.dto';
import { PaymentDTO } from './order-dto/payment.dto';
import { CreateOrderInterceptor } from 'src/common/interceptors/order-service/create-order.intercepter';
import { GetOrderDto } from './order-dto/get-order.dto';
import { OrderDetailDto } from './order-dto/order-detail.dto';
import { OrderDetailCustomerDto } from './order-dto/order-detail-customer.dto';

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
        console.log(getOrder);
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
        // const token = 
        console.log(req['email']);
        return await this.apiGatewayOrderService.confirmOrder(id);
    }


    @UseGuards(UserRoleGuard)
    @Get(':id/cancel')
    async cancelOrder(@Request() req: any, @Param(':id') id: number){
        const token = req['token']
        return await this.apiGatewayOrderService.cancelOrder(id);
    }

    @UseGuards(UserRoleGuard)
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
    async deliveryPayment(@Param('id') id: number, @Body() paymentDto: PaymentDTO){
        //const token = req['token']
        return await this.apiGatewayOrderService.deliveryPayment(id, paymentDto);
    }

    
    @UseGuards(UserRoleGuard)
    @Post(':id/payment')
    async payment(@Param('id') id: number, @Request() req: any, @Body() paymentDto: PaymentDTO){
        // const token = req['token']
        return await this.apiGatewayOrderService.payment(id, paymentDto);
    }


    @UseGuards(UserRoleGuard)
    @Get('find-orders-customer')
    async findOrdersByCustomerId(@Request() req: any): Promise<OrderDto[]>{
        const email = req['email'];
        return await this.apiGatewayOrderService.findOrdersByCustomerId(email);
    }

    @UseGuards(UserRoleGuard)
    @Get('find-order/:id/customer')
    async findOrderByCustomerId(@Param('id') id: number, @Request() req: any): Promise<OrderDto>{
        const email = req['email'];
        return await this.apiGatewayOrderService.findOrderByCustomerId(id, email);
    }


    @UseGuards(UserRoleGuard)
    @Get('find-orders-freelancer')
    async findOrdersFreelancerId(@Request() req: any): Promise<OrderDto[]>{
        const email = req['email'];
        return await this.apiGatewayOrderService.findOrdersByFreelancerId(email);
    }

    @UseGuards(UserRoleGuard)
    @Get('find-order-detail-customer/:id')
    async getOrderDetail(@Param('id') id: number, @Request() req: any): Promise<OrderDetailDto>{
        const email = req['email'];
        //const token = req['token'];
        return await this.apiGatewayOrderService.getOrderDetailCustomer(id,email);
    }

    @UseGuards(UserRoleGuard)
    @Get('find-order-detail-freelancer/:id')
    async getOrderDetailByFreelancer(@Param('id') id: number, @Request() req: any): Promise<OrderDetailDto>{
        const email = req['email'];
        //const token = req['token'];
        return await this.apiGatewayOrderService.getOrderDetailByFreelancerId(id,email);
    }
  

    @UseGuards(UserRoleGuard) // 1
    @Get('find-order-detail-list-customer')
    async getOrderDetailsByCustomerId(@Request() req: any): Promise<OrderDetailDto[]>{
        const email = req['email'];
        //const token = req['token'];
        console.log(email);
        return await this.apiGatewayOrderService.getOrderDetailsByCustomerId(email);
    }


    @UseGuards(UserRoleGuard)
    @Get('find-order-detail-freelancer/:id')
    async getOrderDetailByFreelancerId(@Param('id') id: number, @Request() req: any): Promise<OrderDetailDto>{
        const email = req['email'];
        return await this.apiGatewayOrderService.getOrderDetailByFreelancerId( id, email);
    }
  

    @UseGuards(UserRoleGuard)
    @Get('find-order-detail-list-freelancer')
    async getOrderDetailsByFreelancerId(@Request() req: any): Promise<OrderDetailCustomerDto[]>{
        const email = req['email'];
        return await this.apiGatewayOrderService.getOrderDetailsByFreelancerId(email);
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
