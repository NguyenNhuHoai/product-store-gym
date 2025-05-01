import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { ProductVariantModel } from './product_variants.model';
import { InjectModel } from '@nestjs/sequelize';
import { createProductVariantsDTO } from './dto/create_product_variants.dto';

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectModel(ProductVariantModel)
    private readonly productVariantModel: typeof ProductVariantModel,
  ) {}
  async createProductVariant(data: createProductVariantsDTO) {
    const newProductVariant = await this.productVariantModel.create(data);
    return {
      status: 200,
      message: 'created product variant success!',
      product_variant: newProductVariant,
    };
  }

  async getAllProductVariant() {
    const product_variants = await this.productVariantModel.findAll();
    return {
      status: 200,
      message: 'get all product variant success!',
      product_variants: product_variants,
    };
  }

  async findOneProductVariant(id: string) {
    const product_variant = await this.productVariantModel.findOne({
      where: { id },
    });
    return {
      status: 200,
      message: 'get product variant success!',
      product_variant: product_variant,
    };
  }

  async updateProductVariant(id: string, data: createProductVariantsDTO) {
    const checkId = this.findOneProductVariant(id);
    if (!checkId) {
      throw new NotFoundException('Tài nguyên yêu cầu không tồn tại');
    }
    const [update] = await this.productVariantModel.update(
      {
        product_id: data.product_id,
        price: data.price,
        sku: data.sku,
        size: data.size,
        stock_quantity: data.stock_quantity,
      },
      {
        where: { id },
      },
    );

    if (update === 0) {
      return {
        status: 404,
        message: 'Product variant not found or nothing changed',
      };
    }
    const updateProductVariant = await this.findOneProductVariant(id);
    return {
      status: 200,
      message: 'update products success!',
      product: updateProductVariant,
    };
  }
}
