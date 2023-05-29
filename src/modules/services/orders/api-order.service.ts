import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices/client';
// import { OrderCreatedEvent } from './order-dto/create-order.dto';
import { OrderDto } from './order-dto/order.dto';
import axios from 'axios';
import { PaymentDTO } from './order-dto/payment.dto';
import { PostDto } from '../posts/post-dto/post.dto';
import { GetOrderDto } from './order-dto/get-order.dto';

//import { OrderCreatedEvent } from './order-created.event';
const ipv4 = "10.251.1.194";
@Injectable()
export class ApiGatewayOrderService {
    

  constructor(
  ){}

    async getPostById(id: number): Promise<PostDto>{
        const url = `http://localhost:8089/post/posts/get-post/${id}`;
        try {
            const response = await axios.get(url); 
            const post = await response.data;
            return await post;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    async createOrder(getOrder: GetOrderDto): Promise<OrderDto>{
        const getPostById = await this.getPostById(getOrder.post_id);

        const post: PostDto = getPostById;
        var orderDto: OrderDto = {
            id: 0,
            customerID: '',
            jobPostID: 0,
            FreelancerID: '',
            createTime: undefined,
            deliveryTime: 0,
            totalPrice: 0,
            status: ''
        }; 
        orderDto.FreelancerID = post.post_detail.profile_user;
        orderDto.totalPrice = post.post_detail.packages[getOrder.package_id].package_detail.unit_price;
        orderDto.deliveryTime = post.post_detail.packages[getOrder.package_id].package_detail.delivery_day;
        orderDto.customerID = getOrder.customer_id;
        orderDto.jobPostID = getPostById.post_id;
        orderDto.status = 'Offer'

        const url = `http://10.251.1.194:8068/orders/create`; // check here
        const data = orderDto;
        try {
            const response = await axios.post(url, data, 
            );
        return response.data;
        } catch (error) {
            console.log(error);
            //throw new Error(error.response.data.message);
        }
    }

    async viewHistoryOrder(token: string){
        const url = `http://${ipv4}:8068/order/get-history-order`;
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
        return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    async findOrderById(token: string, id: number){
        const url = `http://${ipv4}:8068/order/${id}`;
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
        return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }


    async confirmOrder(token: string, id: number){
        const url = `http://${ipv4}:8068/orders/${id}/confirm`;
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
        return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
   
    async cancelOrder(token: string, id: number){
        const url = `http://${ipv4}:8068/order/${id}/cancel`;
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
        return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }


    async depositPayment(id:number, paymentDto: PaymentDTO){
        const url = `http://10.251.1.194:8068/payment/${id}/deposit`;
        const data = paymentDto;
        console.log(paymentDto);
        try {
            const response = await axios.post(url, data,
            //      {
            //     headers: {
            //         'Authorization': `Bearer ${token}` 
            //     }
            // }
            );
        return response.data;
        } catch (error) {
            console.log(Error(error.response.data.message)) 
        }
    }


    async deliveryPayment(token: string, id:number, paymentDto: PaymentDTO){
        const url = `http://${ipv4}:8068/payment/${id}/delivery`;
        const data = paymentDto;
        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
        return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    async payment(token: string, id:number, paymentDto: PaymentDTO){
        const url = `http://${ipv4}:8068/order/payment/${id}/payment`;
        const data = paymentDto;
        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
        return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
}
