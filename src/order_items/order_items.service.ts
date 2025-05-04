import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { OrderItemModel } from './order_items.model';
import { InjectModel } from '@nestjs/sequelize';
import { createOrderItemDTO } from './dto/create_order_item.dto';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectModel(OrderItemModel)
    private readonly orderItemModel: typeof OrderItemModel,
  ) {}

  async create(data: createOrderItemDTO) {
    try {
      const newOrderItem = await this.orderItemModel.create(data);
      return {
        status: 200,
        message: 'Created order item success!',
        newOrderItem: newOrderItem,
      };
    } catch (error) {
      throw Error(error);
    }
  }

  async getAll() {
    try {
      const orderItems = await this.orderItemModel.findAll();
      return {
        status: 200,
        message: 'Get all order item success!',
        orderItems: orderItems,
      };
    } catch (error) {
      throw Error(error);
    }
  }

  async updateOrderItem(id: string, data: createOrderItemDTO) {
    const isValidOrderItem = await this.orderItemModel.findOne({
      where: { id },
    });

    if (!isValidOrderItem) {
      throw new BadRequestException('Is not id Order item');
    }

    const [update] = await this.orderItemModel.update(
      {
        order_id: data.order_id,
        quantity: data.quantity,
        productVariant_id: data.productVariant_id,
        price_at_purchase: data.price_at_purchase,
      },
      {
        where: { id },
      },
    );

    if (update === 0) {
      return {
        status: 404,
        message: 'Order item not found or nothing changed',
      };
    }

    const updateOrderItem = await this.orderItemModel.findByPk(id);

    return {
      status: 200,
      message: 'update Order item success!',
      product: updateOrderItem,
    };
  }

  async delete(id: string) {
    try {
      const orderItem = await this.orderItemModel.findOne({ where: { id } });
      if (!orderItem) {
        throw new NotFoundException('order item does not exist!');
      }

      const deleted = await this.orderItemModel.destroy({ where: { id } });
      if (deleted === 0) {
        throw new InternalServerErrorException('Failed to delete order item!');
      }

      return {
        status: 200,
        message: 'Deleted order item successfully!',
      };
    } catch (error) {
      throw error;
    }
  }
}
