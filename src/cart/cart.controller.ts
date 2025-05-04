import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { createCarDTO } from './dto/create_car.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly carService: CartService) {}

  @Post()
  async createOrder(@Body() data: createCarDTO) {
    return this.carService.createCart(data);
  }

  @Get()
  async getAll() {
    return this.carService.getAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.carService.delete(id);
  }
}
