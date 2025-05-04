import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CartItemsModel } from './cart_items.model';
import { InjectModel } from '@nestjs/sequelize';
import { createCartItemDTO } from './dto/create_cart_item.dto';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectModel(CartItemsModel)
    private readonly cartItemModel: typeof CartItemsModel,
  ) {}

  async create(data: createCartItemDTO) {
    try {
      const newCartItem = await this.cartItemModel.create(data);
      return {
        status: 200,
        message: 'Created cartItem success!',
        cartItem: newCartItem,
      };
    } catch (error) {
      throw Error(error);
    }
  }

  async getAll() {
    try {
      const cartItems = await this.cartItemModel.findAll();
      return {
        status: 200,
        message: 'Get all cart item success!',
        cartItems: cartItems,
      };
    } catch (error) {
      throw Error(error);
    }
  }

  async delete(id: string) {
    try {
      const cart = await this.cartItemModel.findOne({ where: { id } });
      if (!cart) {
        throw new NotFoundException('Cart item does not exist!');
      }

      const deleted = await this.cartItemModel.destroy({ where: { id } });
      if (deleted === 0) {
        throw new InternalServerErrorException('Failed to delete cart item!');
      }

      return {
        status: 200,
        message: 'Deleted cart item successfully!',
      };
    } catch (error) {
      throw error;
    }
  }

  async updateCartItem(id: string, data: createCartItemDTO) {
    const isValidCartItem = await this.cartItemModel.findOne({ where: { id } });

    if (!isValidCartItem) {
      throw new BadRequestException('Is not id cart item');
    }

    const [update] = await this.cartItemModel.update(
      {
        cart_id: data.cart_id,
        quantity: data.quantity,
        product_variant_id: data.product_variant_id,
      },
      {
        where: { id },
      },
    );

    if (update === 0) {
      return {
        status: 404,
        message: 'Cart item not found or nothing changed',
      };
    }

    const updateCartItem = await this.cartItemModel.findByPk(id);

    return {
      status: 200,
      message: 'update cart item success!',
      product: updateCartItem,
    };
  }
}
