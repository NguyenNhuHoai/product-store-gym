import { Module } from '@nestjs/common';
import { ReviewImagesService } from './review_images.service';
import { ReviewImagesController } from './review_images.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewImagesModel } from './review_images.model';

@Module({
  imports: [SequelizeModule.forFeature([ReviewImagesModel])],
  providers: [ReviewImagesService],
  controllers: [ReviewImagesController],
})
export class ReviewImagesModule {}
