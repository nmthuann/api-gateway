import {
  ConsoleLogger,
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import {
  Consumer,
  ConsumerConfig,
  ConsumerRunConfig,
  ConsumerSubscribeTopic,
  Kafka,
  KafkaMessage,
  Message,
} from 'kafkajs';

@Injectable()
export class ConsumerService  {//implements OnApplicationShutdown

  private readonly consumers: Consumer[] = [];

  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'],
    //onnectionTimeout: 6000,
  });

  async shutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }

  async consume(
    groupId: string,
    topic: ConsumerSubscribeTopic,
    config: ConsumerRunConfig,
  ) {
    const consumer: Consumer = this.kafka.consumer({ groupId: groupId, 
    });//sessionTimeout: 6000
    await consumer.connect().catch((e) => console.error(e));
    await consumer.subscribe(topic);
    await consumer.run(config);
    this.consumers.push(consumer);
    //await consumer.stop().catch((e) => console.error(e));
    // setTimeout(() => {
    //   consumer.stop().catch((e) => console.error(e));
    // }, 10000);
  }

  async handleMessage <T>(groupId: string, resTopic: string): Promise<T>{
    return new Promise<T>((resolve, reject) => {
      //try {
        this.consume(
          groupId,
          { topic: resTopic },
          {
            eachMessage: async ({ message }) => {
              const output = await JSON.parse(message.value.toString());
              resolve(output);
            },
          }
        );
        // close connect consumer
        this.shutdown();
      // } catch (error) {
      //   reject(error);
      // }
    });
  }
   

} 
 
// async onApplicationShutdown() {
  //   for (const consumer of this.consumers) {
  //     await consumer.disconnect();
  //   }
  // }


  // async handlseMessage(groupId: string, resTopic: string){
  //   const handleMessage = new Promise<TokensDto>( (resolve, reject) => {// async
  //       try {
  //         //await 
  //         this.consumerService.consume(
  //           groupId,
  //           {topic: resTopic},
  //           {
  //             eachMessage: async ({ message }) => {
  //               const output = await JSON.parse(message.value.toString());
  //               resolve(output);
  //             }
  //           }
  //         );
  //         // close connect consumer
  //         this.consumerService.onApplicationShutdown();
  //       } catch (error) {
  //         reject(error);
  //       }
  //     });
  //   return handleMessage;
  //  }