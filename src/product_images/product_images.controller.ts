import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductImagesService } from './product_images.service';
import { createProductImageDTO } from './dto/create_product_images.dto';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { AdminGuard } from 'src/auth/jwt-auth.guard';

@Controller('product-images')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Post()
  @UseGuards(AdminGuard)
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
    @Body() body: createProductImageDTO,
  ) {
    const sanitizedProductId = body.product_id.replace(/^"+|"+$/g, '');
    const imageUrl = `uploads/${file.filename}`;
    const data = {
      product_id: sanitizedProductId,
      is_main: body.is_main,
      image_url: imageUrl,
    };
    await this.productImagesService.create(data);
    return {
      message: 'Upload thành công',
      data: {
        product_id: sanitizedProductId,
        is_main: body.is_main,
        image_url: imageUrl,
      },
    };
  }
}
