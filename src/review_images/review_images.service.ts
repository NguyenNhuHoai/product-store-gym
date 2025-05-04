import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createReviewImageDTO } from './dto/create_review_image.dto';
import { ReviewImagesModel } from './review_images.model';

@Injectable()
export class ReviewImagesService {
  constructor(
    @InjectModel(ReviewImagesModel)
    private readonly reviewImageModel: typeof ReviewImagesModel,
  ) {}

  async create(data: createReviewImageDTO): Promise<ReviewImagesModel> {
    return await this.reviewImageModel.create(data);
  }

  async getAll() {
    try {
      const reviewImage = await this.reviewImageModel.findAll();
      return {
        status: 200,
        message: 'Get all success!',
        reviewImage: reviewImage,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async update(id: string, data: createReviewImageDTO) {
    const existingReviewImage = await this.reviewImageModel.findOne({
      where: { id },
    });
    if (!existingReviewImage) {
      throw new NotFoundException('Review image not found');
    }
    const [updatedCount] = await this.reviewImageModel.update(
      {
        images_url: data.images_url || existingReviewImage.images_url,
      },
      {
        where: { id },
      },
    );
    if (updatedCount === 0) {
      return {
        status: 404,
        message: 'No changes were made or image not found',
      };
    }
    const updatedImg = await this.reviewImageModel.findByPk(id);
    return {
      status: 200,
      message: 'Image updated successfully!',
      reviewImage: updatedImg,
    };
  }
}
