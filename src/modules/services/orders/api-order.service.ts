import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices/client';
// import { OrderCreatedEvent } from './order-dto/create-order.dto';
import { OrderDto } from './order-dto/order.dto';
import axios from 'axios';
import { PaymentDTO } from './order-dto/payment.dto';
import { PostDto } from '../posts/post-dto/post.dto';
import { GetOrderDto } from './order-dto/get-order.dto';
import { ProfileDocumentDto } from '../users/user-dto/profile.document.dto';
import {  OrderDetailDto } from './order-dto/order-detail.dto';
import { OrderDetailCustomerDto } from './order-dto/order-detail-customer.dto';

//import { OrderCreatedEvent } from './order-created.event';

const ipv4 = "192.168.111.111";
@Injectable()
export class    ApiGatewayOrderService {
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


    async getProfileByFreelancerId(freelancer_id: string): Promise<ProfileDocumentDto>{
        const url = `http://localhost:8088`;
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
        console.log("getPostById: ", getPostById)
        //const post: PostDto = getPostById;
        var orderDto: OrderDto = {
            id: 0,
            customerID: '',
            jobPostID: 0,
            FreelancerID: '',
            createTime: undefined,
            deliveryTime: 0,
            totalPrice: 0,
            status: '',
            packageDetailID: 0
        }; 
        orderDto.packageDetailID = getOrder.package_id;
        orderDto.FreelancerID = getPostById.post_detail.profile_user;
        orderDto.totalPrice = getPostById.post_detail.packages[getOrder.package_id].package_detail.unit_price;
        orderDto.deliveryTime = getPostById.post_detail.packages[getOrder.package_id].package_detail.delivery_day;
        orderDto.customerID = getOrder.customer_id;
        orderDto.jobPostID = getPostById.post_id;
        orderDto.status = 'Offer'

        const url = `http://${ipv4}:8068/orders/create`; // check here
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


    async confirmOrder(id: number){
        const url = `http://${ipv4}:8068/orders/${id}/confirm`;
        try {
            const response = await axios.get(url);
        return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
   
    async cancelOrder(id: number){
        const url = `http://${ipv4}:8068/order/${id}/cancel`;
        try {
            const response = await axios.get(url, 
            //     {
            //     headers: {
            //         'Authorization': `Bearer ${token}` 
            //     }
            // }
            );
        return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }


    async depositPayment(id:number, paymentDto: PaymentDTO){
        const url = `http://${ipv4}:8068/payment/${id}/deposit`;
        const data = paymentDto;
        console.log(paymentDto);
        try {
            const response = await axios.post(url, data,
            );
        return response.data;
        } catch (error) {
            console.log(Error(error.response.data.message)) 
        }
    }


    async deliveryPayment(id:number, paymentDto: PaymentDTO){
        const url = `http://${ipv4}:8068/payment/${id}/delivery`;
        const data = paymentDto;
        try {
            const response = await axios.get(url, 
            //     {
            //     headers: {
            //         'Authorization': `Bearer ${token}` 
            //     }
            // }
            );
        return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    async payment(id:number, paymentDto: PaymentDTO){
        const url = `http://${ipv4}:8068/payment/${id}/payment`;
        const data = paymentDto;
        try {
            const response = await axios.post(url, data, 
                //{
                // headers: {
                //     'Authorization': `Bearer ${token}` 
                // }
            // }
            );
        return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    async findOrdersByCustomerId(email: string): Promise<OrderDto[]> {
        const url = `http://${ipv4}:8068/orders/find-orders-customer/${email}`;
        try {
            const response = await axios.get(url);
            const orders: OrderDto[] = await response.data;
            return orders;
        } catch (error) {
            console.log(Error(error.response.data.message)) 
        }
    }

    async findOrdersByFreelancerId(email: string): Promise<OrderDto[]>{
        const url = `http://${ipv4}:8068/orders/find-orders-freelancer/${email}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }


    async getProfileByEmail(email: string): Promise<ProfileDocumentDto>{
        const url = `http://localhost:8088/user/profile-document/get-freelancer/${email}`;
        try {
            const response = await axios.get(url);
            const profile: ProfileDocumentDto = await response.data;
            console.log("getProfileByEmail: ", profile);
            return profile;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }


    async findOrderByCustomerId(id: number, email: string): Promise<OrderDto>{
        const url = `http://${ipv4}:8068/orders/find-order/${id}/customer/${email}`;
        try {
            const response = await axios.get(url);
            const order = response.data;
            return order;
        } catch (error) {
            console.log(Error(error.response.data.message)) 
        }
    }


    async findOrderByFreelancerId(id: number, email: string): Promise<OrderDto>{
        const url = `http://${ipv4}:8068/orders/find-order/${id}/freelancer/${email}`;
        try {
            const response = await axios.get(url);
            const order = response.data;
            return order;
        } catch (error) {
            console.log(Error(error.response.data.message)) 
        }
    }


    async getOrderDetailCustomer(id: number, email: string): Promise<OrderDetailDto>{

        var orderDetailDto: OrderDetailDto = {
                post_name: '',
                post_id: 0,
                description: '',
                package_name: '',
                total_price: 0,
                delivery_day: 0,
                revison: '',
                order_id: 0,
                status_order: '',
                freelancer_name: '',
                freelancer_id: '',
                avatar: '',
                my_skill: '',
                occupation: '',
                level: ''
            };


        // find order
        const getOrderByCustomerId = await this.findOrderByCustomerId(id, email);
        if (!getOrderByCustomerId) return null;
        else{
            const getPostById = await this.getPostById(getOrderByCustomerId.jobPostID);
            const getProfile = await this.getProfileByEmail(getOrderByCustomerId.FreelancerID);// find profile
 
            
            console.log(getOrderByCustomerId);
            console.log(getPostById);
            console.log(getProfile);
            

            //  post 
            orderDetailDto.post_name = getPostById.post_name;
            orderDetailDto.post_id = getPostById.post_id;
            orderDetailDto.description = getPostById.post_detail.description;

            //  post detail
            orderDetailDto.package_name = 
            getPostById.post_detail.packages[getOrderByCustomerId.packageDetailID].package_name;
            orderDetailDto.total_price = 
            getPostById.post_detail.packages[getOrderByCustomerId.packageDetailID].package_detail.unit_price;
            orderDetailDto.revison = 
            getPostById.post_detail.packages[getOrderByCustomerId.packageDetailID].package_detail.revision;
            orderDetailDto.delivery_day = 
            getPostById.post_detail.packages[getOrderByCustomerId.packageDetailID].package_detail.delivery_day;


            //  profile
            orderDetailDto.freelancer_id = getOrderByCustomerId.FreelancerID;
            orderDetailDto.freelancer_name = getProfile.first_name + " " + getProfile.last_name;
            orderDetailDto.avatar = getProfile.profileDetail.level;
            orderDetailDto.level = getProfile.profileDetail.level;
            orderDetailDto.my_skill = getProfile.profileDetail.mySkill;
            orderDetailDto.occupation = getProfile.profileDetail.occupation;

            //  order
            orderDetailDto.order_id = getOrderByCustomerId.id;
            orderDetailDto.status_order = getOrderByCustomerId.status;
            return orderDetailDto;
        }
    }


    //  Get Order Details By CustomerId
    async getOrderDetailsByCustomerId(email: string): Promise<OrderDetailDto[]>{
        const getOrdesByCustomerId: OrderDto[] = (await this.findOrdersByCustomerId(email));
        var orderDetailList: OrderDetailDto[] = [];
        
        //if(ema)
        for (const order of getOrdesByCustomerId) {
            
            var orderDetailDto: OrderDetailDto = {
                post_name: '',
                post_id: 0,
                description: '',
                package_name: '',
                total_price: 0,
                delivery_day: 0,
                revison: '',
                order_id: 0,
                status_order: '',
                freelancer_name: '',
                freelancer_id: '',
                avatar: '',
                my_skill: '',
                occupation: '',
                level: ''   
            };

            console.log("_id: ", order);
            
            const getPostById = await this.getPostById(order.jobPostID);
            const getProfile = await this.getProfileByEmail(getPostById.post_detail.profile_user);

            //console.log(getOrderByCustomerId);
            console.log(getPostById);
            console.log(" yess: ", getProfile);

            // Assign values from `getPostById`
            orderDetailDto.post_name = getPostById.post_name;
            orderDetailDto.post_id = getPostById.post_id;
            orderDetailDto.description = getPostById.post_detail.description;

            // Assign values from `getPostById.post_detail.packages`
            const packageDetail = getPostById.post_detail.packages[order.packageDetailID];
            orderDetailDto.package_name = packageDetail.package_name;
            orderDetailDto.total_price = packageDetail.package_detail.unit_price;
            orderDetailDto.revison = packageDetail.package_detail.revision;
            orderDetailDto.delivery_day = packageDetail.package_detail.delivery_day;

            // Assign values from `getProfile`
            orderDetailDto.freelancer_id = order.FreelancerID;
            orderDetailDto.freelancer_name = getProfile.first_name + " " + getProfile.last_name;
            orderDetailDto.avatar = getProfile.profileDetail.avatar;
            orderDetailDto.level = getProfile.profileDetail.level;
            orderDetailDto.my_skill = getProfile.profileDetail.mySkill;
            orderDetailDto.occupation = getProfile.profileDetail.occupation;

            // Assign values from `getOrderByCustomerId`
            orderDetailDto.order_id = order.id;
            orderDetailDto.status_order = order.status;

            // Add the `orderDetailDto` to the list
            orderDetailList.push(orderDetailDto);

        }

        return orderDetailList;
    }
   

    async getOrderDetailByFreelancerId(id: number, email: string): Promise<OrderDetailDto>{
        var orderDetailDto:OrderDetailDto = {
                post_name: '',
                post_id: 0,
                description: '',
                package_name: '',
                total_price: 0,
                delivery_day: 0,
                revison: '',
                order_id: 0,
                status_order: '',
                freelancer_name: '',
                freelancer_id: '',
                avatar: '',
                my_skill: '',
                occupation: '',
                level: ''
            };


        // find order
        const getOrderByCustomerId = await this.findOrderByFreelancerId(id, email);
        if (!getOrderByCustomerId) return null;
        else{
            const getPostById = await this.getPostById(getOrderByCustomerId.jobPostID);
            const getProfile = await this.getProfileByEmail(getOrderByCustomerId.customerID);// find profile
 
            
            console.log(getOrderByCustomerId);
            console.log(getPostById);
            console.log(getProfile);
            

            //  post 
            orderDetailDto.post_name = getPostById.post_name;
            orderDetailDto.post_id = getPostById.post_id;
            orderDetailDto.description = getPostById.post_detail.description;

            //  post detail
            orderDetailDto.package_name = 
            getPostById.post_detail.packages[getOrderByCustomerId.packageDetailID].package_name;
            orderDetailDto.total_price = 
            getPostById.post_detail.packages[getOrderByCustomerId.packageDetailID].package_detail.unit_price;
            orderDetailDto.revison = 
            getPostById.post_detail.packages[getOrderByCustomerId.packageDetailID].package_detail.revision;
            orderDetailDto.delivery_day = 
            getPostById.post_detail.packages[getOrderByCustomerId.packageDetailID].package_detail.delivery_day;


            //  profile
            orderDetailDto.freelancer_id = getOrderByCustomerId.customerID;
            orderDetailDto.freelancer_name = getProfile.first_name + " " + getProfile.last_name;
            orderDetailDto.avatar = getProfile.profileDetail.level;
            orderDetailDto.level = getProfile.profileDetail.level;
            orderDetailDto.my_skill = getProfile.profileDetail.mySkill;
            orderDetailDto.occupation = getProfile.profileDetail.occupation;

            //  order
            orderDetailDto.order_id = getOrderByCustomerId.id;
            orderDetailDto.status_order = getOrderByCustomerId.status;
            return orderDetailDto;
        }
    }


    // Get Order Details By FreelancerId
    async getOrderDetailsByFreelancerId(email: string): Promise<OrderDetailCustomerDto[]>{
        const getOrdersByFreelancerId: OrderDto[] = (await this.findOrdersByFreelancerId(email));
        var orderDetailList: OrderDetailCustomerDto[] = [];
        for (const order of getOrdersByFreelancerId) {
            
            var orderDetailDto: OrderDetailCustomerDto = {
                post_name: '',
                post_id: 0,
                description: '',
                package_name: '',
                total_price: 0,
                delivery_day: 0,
                revison: '',
                order_id: 0,
                status_order: '',
                customer_name: '',
                customer_id: '',
                avatar: '',
                my_skill: '',
                occupation: '',
                level: ''   
            };

            console.log("_id: ", order);
            
            const getPostById = await this.getPostById(order.jobPostID);
            
            const getProfile = await this.getProfileByEmail(order.customerID);
            if(!getProfile.profileDetail != null){
                orderDetailDto.avatar = getProfile.profileDetail.avatar;
                orderDetailDto.level = getProfile.profileDetail.level;
                orderDetailDto.my_skill = getProfile.profileDetail.mySkill;
                orderDetailDto.occupation = getProfile.profileDetail.occupation;
            }
            
            // orderDetailDto.avatar = 
            // orderDetailDto.level = getProfile.profileDetail.level;
            // orderDetailDto.my_skill = getProfile.profileDetail.mySkill;
            // orderDetailDto.occupation = getProfile.profileDetail.occupation;

            //console.log(getOrderByCustomerId);
            console.log(getPostById);
            console.log(" yess: ", getProfile);

            // Assign values from `getPostById`
            orderDetailDto.post_name = getPostById.post_name;
            orderDetailDto.post_id = getPostById.post_id;
            orderDetailDto.description = getPostById.post_detail.description;

            // Assign values from `getPostById.post_detail.packages`
            const packageDetail = getPostById.post_detail.packages[order.packageDetailID];
            orderDetailDto.package_name = packageDetail.package_name;
            orderDetailDto.total_price = packageDetail.package_detail.unit_price;
            orderDetailDto.revison = packageDetail.package_detail.revision;
            orderDetailDto.delivery_day = packageDetail.package_detail.delivery_day;

            // Assign values from `getProfile`
            orderDetailDto.customer_id = order.customerID;
            orderDetailDto.customer_name= getProfile.first_name + " " + getProfile.last_name;
            orderDetailDto.avatar = getProfile.profileDetail.avatar;
            orderDetailDto.level = getProfile.profileDetail.level;
            orderDetailDto.my_skill = getProfile.profileDetail.mySkill;
            orderDetailDto.occupation = getProfile.profileDetail.occupation;

            // Assign values from `getOrderByCustomerId`
            orderDetailDto.order_id = order.id;
            orderDetailDto.status_order = order.status;

            // Add the `orderDetailDto` to the list
            orderDetailList.push(orderDetailDto);

        }

        return orderDetailList;
    }
}