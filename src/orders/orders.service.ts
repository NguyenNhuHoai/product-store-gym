import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { OrdersModel } from './orders.model';
import { InjectModel } from '@nestjs/sequelize';
import { createOrderDTO } from './dto/create_order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(OrdersModel)
    private readonly orderModel: typeof OrdersModel,
  ) {}
  async createOrder(data: createOrderDTO) {
    try {
      const newOrder = await this.orderModel.create(data);
      return {
        status: 200,
        message: 'Created order success!',
        cart: newOrder,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      const orders = await this.orderModel.findAll();
      return {
        status: 200,
        message: 'Get all success!',
        orders: orders,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id: string) {
    try {
      const cart = await this.orderModel.findOne({ where: { id } });
      if (!cart) {
        throw new NotFoundException('Order does not exist!');
      }

      const deleted = await this.orderModel.destroy({ where: { id } });
      if (deleted === 0) {
        throw new InternalServerErrorException('Failed to order cart!');
      }

      return {
        status: 200,
        message: 'Deleted order successfully!',
      };
    } catch (error) {
      throw error;
    }
  }
}
