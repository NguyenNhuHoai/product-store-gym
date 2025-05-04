import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReviewsModel } from './reviews.model';
import { createReviewDTO } from './dto/create_review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(ReviewsModel)
    private readonly reviewModel: typeof ReviewsModel,
  ) {}
  async create(data: createReviewDTO) {
    const newReview = await this.reviewModel.create(data);
    return {
      status: 200,
      message: 'Create review success!',
      newReview: newReview,
    };
  }

  async getAll(page: number, limit: number) {
    console.log(page, limit);
    page = page;
    limit = limit;
    const offset = (page - 1) * limit;
    const { count, rows } = await this.reviewModel.findAndCountAll({
      limit: limit,
      offset: offset,
    });
    return {
      status: 200,
      message: 'Get all review success!',
      products: rows,
      total: count,
      page,
      limit,
    };
  }

  async updateProduct(id: string, data: createReviewDTO) {
    const isValidProduct = await this.reviewModel.findOne({ where: { id } });

    if (!isValidProduct) {
      throw new BadRequestException('Is not id review');
    }

    const [update] = await this.reviewModel.update(
      {
        comment: data.comment,
      },
      {
        where: { id },
      },
    );

    if (update === 0) {
      return {
        status: 404,
        message: 'Review not found or nothing changed',
      };
    }

    const updateReviews = await this.reviewModel.findByPk(id);

    return {
      status: 200,
      message: 'update comment success!',
      reviews: updateReviews,
    };
  }

  async deleteProduct(id: string) {
    const checkIdReview = await this.reviewModel.findOne({ where: { id } });
    if (!checkIdReview) {
      throw new NotFoundException('Review is not defound');
    }
    const deletedPReview = await this.reviewModel.destroy({
      where: { id },
    });
    if (deletedPReview === 0) {
      throw new NotFoundException('Review deletion failed');
    }
    return {
      status: 200,
      message: 'Review delete success!',
    };
  }
}
