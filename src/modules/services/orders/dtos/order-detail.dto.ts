export class OrderDetailDto {
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
  freelancer_name: string;
  freelancer_id: string;
  avatar: string;
  my_skill: string;
  occupation: string;
  level: string;
}
