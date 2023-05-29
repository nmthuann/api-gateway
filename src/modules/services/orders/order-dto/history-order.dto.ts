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
//   constructor(order: OrderDto, status: string) {
//     this.orderID = order.;
//     this.packageDetailID = order.packageDetailID;

//     this.statusOrder = status;
//     this.timeStart = this.getTimeNow();
//     console.log(this.timeStart);
//     this.timeEnd = moment().add(order.deliveryTime, 'days').toDate();
//     this.totalPrice = order.totalPrice;
//   }
//   private getTimeNow(): Date {
//     return moment().toDate();
//   }
}