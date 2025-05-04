import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderItemsService } from './order_items.service';
import { createOrderItemDTO } from './dto/create_order_item.dto';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemService: OrderItemsService) {}
  @Post()
  async createCartItem(@Body() data: createOrderItemDTO) {
    return this.orderItemService.create(data);
  }

  @Get()
  async getAll() {
    return this.orderItemService.getAll();
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() data: createOrderItemDTO) {
    return this.orderItemService.updateOrderItem(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.orderItemService.delete(id);
  }
}
