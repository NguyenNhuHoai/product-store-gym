import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewsModel } from './reviews.model';

@Module({
  imports: [SequelizeModule.forFeature([ReviewsModel])],
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
