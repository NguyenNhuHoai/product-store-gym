import { Module } from '@nestjs/common';
import { ProductImagesController } from './product_images.controller';
import { ProductImagesService } from './product_images.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductImageModel } from './product_images.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
@Module({
  imports: [
    SequelizeModule.forFeature([ProductImageModel]),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // Định nghĩa URL mà client sẽ sử dụng để truy cập các tệp
    }),
  ],
  controllers: [ProductImagesController],
  providers: [ProductImagesService],
})
export class ProductImagesModule {}
