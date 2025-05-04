import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { createOrderDTO } from './dto/create_order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}
  @Post()
  async createCart(@Body() data: createOrderDTO) {
    return this.orderService.createOrder(data);
  }

  @Get()
  async getAll() {
    return this.orderService.getAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.orderService.delete(id);
  }
}
