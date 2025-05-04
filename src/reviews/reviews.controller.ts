import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { createReviewDTO } from './dto/create_review.dto';
import { AdminGuard } from 'src/auth/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}
  @Post()
  createProduct(@Body() data: createReviewDTO) {
    return this.reviewService.create(data);
  }
  @Get()
  @UseGuards(AdminGuard)
  getAllProduct(@Query('page') page = 1, @Query('limit') limit = 4) {
    return this.reviewService.getAll(page, limit);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() data: createReviewDTO) {
    return this.reviewService.updateProduct(id, data);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.reviewService.deleteProduct(id);
  }
}
