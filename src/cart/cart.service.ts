import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CartModel } from './cart.model';
import { createCarDTO } from './dto/create_car.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartModel)
    private readonly cartModel: typeof CartModel,
  ) {}

  async createCart(data: createCarDTO) {
    try {
      const newCart = await this.cartModel.create(data);
      return {
        status: 200,
        message: 'Created car success!',
        cart: newCart,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      const carts = await this.cartModel.findAll();
      return {
        status: 200,
        message: 'Get all success!',
        carts: carts,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id: string) {
    try {
      const cart = await this.cartModel.findOne({ where: { id } });
      if (!cart) {
        throw new NotFoundException('Cart does not exist!');
      }

      const deleted = await this.cartModel.destroy({ where: { id } });
      if (deleted === 0) {
        throw new InternalServerErrorException('Failed to delete cart!');
      }

      return {
        status: 200,
        message: 'Deleted cart successfully!',
      };
    } catch (error) {
      throw error;
    }
  }
}
