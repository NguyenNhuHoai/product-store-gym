import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DiscountCodesModel } from './discount_codes.model';
import { createDiscountCodeDTO } from './dto/create_discount_codes.dto';
import { generateDiscountCode } from 'src/function_helps/fcHelp';

@Injectable()
export class DiscountCodesService {
  constructor(
    @InjectModel(DiscountCodesModel)
    private readonly discountCodeModel: typeof DiscountCodesModel,
  ) {}
  async create(data: createDiscountCodeDTO) {
    try {
      const code = generateDiscountCode();
      const dataDiscount = { ...data, code };
      const newDiscountCode = await this.discountCodeModel.create(dataDiscount);
      return {
        status: 200,
        message: 'Created discount code item success!',
        newDiscountCode: newDiscountCode,
      };
    } catch (error) {
      throw Error(error);
    }
  }

  async getAll() {
    try {
      const discountCode = await this.discountCodeModel.findAll();
      return {
        status: 200,
        message: 'Get all discount code item success!',
        discountCode: discountCode,
      };
    } catch (error) {
      throw Error(error);
    }
  }

  async delete(id: string) {
    try {
      const discount = await this.discountCodeModel.findOne({ where: { id } });
      if (!discount) {
        throw new NotFoundException('Discount does not exist!');
      }

      const deleted = await this.discountCodeModel.destroy({ where: { id } });
      if (deleted === 0) {
        throw new InternalServerErrorException('Failed to delete Discount!');
      }

      return {
        status: 200,
        message: 'Deleted Discount successfully!',
      };
    } catch (error) {
      throw error;
    }
  }
}
