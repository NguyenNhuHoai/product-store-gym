import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const config = new DocumentBuilder()
  //   .setTitle('Back end NestJS') // Tiêu đề API
  //   .setDescription('API documentation for your project') // Mô tả API
  //   .setVersion('1.0') // Phiên bản API
  //   .addTag('product') // Tag cho các endpoint liên quan đến sản phẩm
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document); // Cấu hình Swagger UI tại đường dẫn /api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
