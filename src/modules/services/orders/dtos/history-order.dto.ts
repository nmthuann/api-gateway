import { OrderDto } from './order.dto';
export default class HistoryOrderDTO {
  orderID: OrderDto;
  timeStart: Date;
  timeEnd: Date;
  statusOrder: string;
  paymentID: string;
  packageDetailID: number;
  reviewID: number;
  totalPrice: number;
}
