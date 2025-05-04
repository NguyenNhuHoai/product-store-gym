import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DiscountProductModel } from './discount_product.model';
import { createDiscountProductDTO } from './dto/create_discount_product.dto';

@Injectable()
export class DiscountProductService {
  constructor(
    @InjectModel(DiscountProductModel)
    private readonly discountProductModel: typeof DiscountProductModel,
  ) {}
  async create(data: createDiscountProductDTO) {
    try {
      const discountProduct = await this.discountProductModel.create(data);
      return {
        status: 200,
        message: 'Created discount product item success!',
        discountProduct: discountProduct,
      };
    } catch (error) {
      throw Error(error);
    }
  }

  async getAll() {
    try {
      const discountProduct = await this.discountProductModel.findAll();
      return {
        status: 200,
        message: 'Get all discount product success!',
        discountProduct: discountProduct,
      };
    } catch (error) {
      throw Error(error);
    }
  }

  async delete(id: string) {
    try {
      const discountProductID = await this.discountProductModel.findOne({
        where: { id },
      });
      if (!discountProductID) {
        throw new NotFoundException('Discount product does not exist!');
      }

      const deleted = await this.discountProductModel.destroy({
        where: { id },
      });
      if (deleted === 0) {
        throw new InternalServerErrorException(
          'Failed to delete discount product!',
        );
      }

      return {
        status: 200,
        message: 'Deleted discount product successfully!',
      };
    } catch (error) {
      throw error;
    }
  }
}
