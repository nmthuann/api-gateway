import { Injectable } from '@nestjs/common'
import { Kafka, Producer, ProducerRecord } from 'kafkajs'

@Injectable()
export class ProducerService {
  private readonly kafka = new Kafka({
    clientId: 'api-gateway',
    brokers: ['localhost:9092']
  })

  private readonly producer: Producer = this.kafka.producer()

  async produce(record: ProducerRecord) {
    try {
      console.log(`Message sent to topic ${record.topic}: ${JSON.stringify(record.messages)}`)
      return await this.producer.send(record)
    } catch (err) {
      throw new Error(`Failed to send message to topic ${record.topic}: ${err.message}`)
    }
  }

  public async start(): Promise<void> {
    try {
      await this.producer.connect()
    } catch (error) {
      console.log('Error connecting the producer: ', error)
    }
  }

  public async shutdown(): Promise<void> {
    await this.producer.disconnect()
  }

  async sendMessage(reqTopic: string, message: any, timeout: number) {
    await this.start()
    await this.produce({
      topic: reqTopic,
      messages: [{ value: JSON.stringify(message) }],
      timeout: timeout
    })
    await this.shutdown()
  }
}

// async onModuleInit() {
//   //await this.producer.connect();
//   try {
//     await this.producer.connect()
//   } catch (error) {
//     console.log('Error connecting the producer: ', error)
//   }
// }
// async onApplicationShutdown() {
//   await this.producer.disconnect();
// }
