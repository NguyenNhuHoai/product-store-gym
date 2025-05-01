import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductsModel } from './products.model';
import { createProductDTO } from './dto/create_product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductVariantModel } from 'src/product_variants/product_variants.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductsModel)
    private readonly productModel: typeof ProductsModel,
    @InjectModel(ProductVariantModel)
    private readonly productsVariantModel: typeof ProductVariantModel,
  ) {}

  async create(data: createProductDTO) {
    const newProduct = await this.productModel.create(data);
    return {
      status: 200,
      message: 'Create product success!',
      product: newProduct,
    };
  }

  async getAll(page: number, limit: number) {
    console.log(page, limit);
    page = page;
    limit = limit;
    const offset = (page - 1) * limit;
    const { count, rows } = await this.productModel.findAndCountAll({
      limit: limit,
      offset: offset,
      include: [{ model: ProductVariantModel, as: 'productVariants' }],
    });
    return {
      status: 200,
      message: 'Get all products success!',
      products: rows,
      total: count,
      page,
      limit,
    };
  }

  async findOne(id: string) {
    const product = await this.productModel.findOne({
      where: { id },
    });
    return {
      status: 200,
      message: 'Get product success!',
      product: product,
    };
  }

  async updateProduct(id: string, data: createProductDTO) {
    const isValidProduct = await this.findOne(id);

    if (!isValidProduct) {
      throw new BadRequestException('Is not id products');
    }

    const [update] = await this.productModel.update(
      {
        name: data.name,
        brand_id: data.brand_id,
        category_id: data.category_id,
        description: data.description,
        status: data.status,
      },
      {
        where: { id },
      },
    );

    if (update === 0) {
      return {
        status: 404,
        message: 'Product not found or nothing changed',
      };
    }

    const updateProduct = await this.productModel.findByPk(id);

    return {
      status: 200,
      message: 'update products success!',
      product: updateProduct,
    };
  }

  async deleteProduct(id: string) {
    const checkIdProduct = await this.productModel.findOne({ where: { id } });
    if (!checkIdProduct) {
      throw new NotFoundException('Product is not defound');
    }
    const deletedProduct = await this.productModel.destroy({
      where: { id },
    });
    if (deletedProduct === 0) {
      throw new NotFoundException('Product deletion failed');
    }
    return {
      status: 200,
      message: 'Product delete success!',
    };
  }
}
