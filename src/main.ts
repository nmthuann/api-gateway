import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // tiền tố api
  await app.listen(3000);
  console.log("API GATEWAY ..........")
  console.log("http://localhost:3000/")
}
bootstrap();
