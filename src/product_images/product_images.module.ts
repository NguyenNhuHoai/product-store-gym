import { Module } from '@nestjs/common';
import { ProductImagesController } from './product_images.controller';
import { ProductImagesService } from './product_images.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductImageModel } from './product_images.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductImageModel])],
  controllers: [ProductImagesController],
  providers: [ProductImagesService],
})
export class ProductImagesModule {}
