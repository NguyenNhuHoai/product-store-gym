import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { createCartItemDTO } from './dto/create_cart_item.dto';

@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemService: CartItemsService) {}

  @Post()
  async createCartItem(@Body() data: createCartItemDTO) {
    return this.cartItemService.create(data);
  }

  @Get()
  async getAll() {
    return this.cartItemService.getAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.cartItemService.delete(id);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() data: createCartItemDTO) {
    return this.cartItemService.updateCartItem(id, data);
  }
}
