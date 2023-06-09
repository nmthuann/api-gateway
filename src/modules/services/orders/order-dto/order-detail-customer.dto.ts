import { PostDto } from "../../posts/post-dto/post.dto";
import { ProfileDto } from "../../users/user-dto/profile.dto";
import { OrderDto } from "./order.dto";

export class OrderDetailCustomerDto{

    //  post
    post_name: string;
    post_id: number;
    description: string;

    //  package
    package_name: string;
    total_price: number;
    delivery_day: number;
    revison: string;

    // order
    order_id: number;
    status_order: string;

    //  profile
    customer_name: string;
    customer_id: string;
    avatar: string;
    my_skill: string;
    occupation: string;
    level: string;    

    
}