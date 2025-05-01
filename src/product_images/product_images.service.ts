import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductImageModel } from './product_images.model';
import { createProductImageDTO } from './dto/create_product_images.dto';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectModel(ProductImageModel)
    private readonly productImageModel: typeof ProductImageModel,
  ) {}

  async create(data: createProductImageDTO): Promise<ProductImageModel> {
    return this.productImageModel.create(data);
  }
}
