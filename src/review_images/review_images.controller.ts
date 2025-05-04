import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { createReviewImageDTO } from './dto/create_review_image.dto';
import { ReviewImagesService } from './review_images.service';
@Controller('review-images')
export class ReviewImagesController {
  constructor(private readonly reviewImageService: ReviewImagesService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${uuidv4()}${path.extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: createReviewImageDTO,
  ) {
    const sanitizedReviewId = body.review_id.replace(/^"+|"+$/g, '');
    const imageUrl = `uploads/${file.filename}`;

    return await this.reviewImageService.create({
      review_id: sanitizedReviewId,
      images_url: imageUrl,
    });
  }

  @Get()
  async getAll() {
    return this.reviewImageService.getAll();
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${uuidv4()}${path.extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: createReviewImageDTO,
    @Param('id') id: string,
  ) {
    let imageUrl: string = body.images_url || '';
    if (file) {
      imageUrl = `uploads/${file.filename}`;
    }
    return await this.reviewImageService.update(id, {
      images_url: imageUrl,
      review_id: body.review_id,
    });
  }
}
