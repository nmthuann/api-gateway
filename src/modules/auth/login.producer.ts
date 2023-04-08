import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class AuthServiceProducer {
//    private kafka: Kafka;
//   private producer;

// const kafka = new Kafka({
//   logLevel: logLevel.DEBUG,
//   brokers: [`${host}:9092`],
//   clientId: 'example-producer',
// })

// const topic = 'topic-test'
// const producer = kafka.producer()

  constructor(private kafka: Kafka, private producer: any) 
    {
        this.kafka = new Kafka({
        clientId: 'api-gateway',
        brokers: ['localhost:9092'],
        });
        this.producer = this.kafka.producer();
    }

  async send(topic: string, message: any) {
    await this.producer.connect();
    await this.producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });
    await this.producer.disconnect();
  }
}