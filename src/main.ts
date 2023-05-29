import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  dotenv.config();
  app.setGlobalPrefix('api'); // tiền tố api
  await app.listen(3333);
  console.log("API GATEWAY ..........")
  console.log("http://localhost:3333/")
}
bootstrap();
