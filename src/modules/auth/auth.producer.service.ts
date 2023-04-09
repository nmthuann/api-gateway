// import { Injectable } from '@nestjs/common';
// import { Kafka } from 'kafkajs';
// import { ProducerService } from 'src/kafka/producer.service';
// import { LoginUserDto } from './login.dto';

// @Injectable()
// export class AuthProducerService{
//     constructor(private producerService: ProducerService){}
//     /**
//      * 
//      * @param topic 
//      * @param message 
//      * topic: string
//      * messages: Message[]
//      * acks?: number
//      * timeout?: number
//      * compression?: CompressionTypes
//      */

//     async login(topic: string, message: LoginUserDto) {
         
//         console.log("test DTO:",{
//             topic: topic,
//             message: message.toString()
//         });

//         // thiết lập connect
//         await this.producerService.onModuleInit();
//         await this.producerService.produce({
//             topic: topic,
//             messages: [
//                 {
//                     value:message.toString()
//                 }
//             ],// có thể lỗi ở đây
//             timeout: 6000 // chỗ này chưa ổn
//         });

//         // đóng connect
//         await this.producerService.onApplicationShutdown();
//         //return ''
//     }

//     async logout(){

//     }

// }








// // private kafka: Kafka;
// //   private producer:any ;

// //   constructor() {
// //     this.kafka = new Kafka({
// //       clientId: 'api-gateway',
// //       brokers: ['localhost:9092'],
// //     });
// //     this.producer = this.kafka.producer();
// //   }

// //   async send(topic: string, message: any) {
// //     await this.producer.connect();
// //     await this.producer.send({
// //       topic,
// //       messages: [
// //         {
// //           value: JSON.stringify(message),
// //         },
// //       ],
// //     });
// //     await this.producer.disconnect();
// //   }