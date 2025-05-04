import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DiscountProductService } from './discount_product.service';
import { createDiscountProductDTO } from './dto/create_discount_product.dto';
import { AdminGuard } from 'src/auth/jwt-auth.guard';

@Controller('discount-product')
export class DiscountProductController {
  constructor(
    private readonly discountProductService: DiscountProductService,
  ) {}

  @Post()
  @UseGuards(AdminGuard)
  async createDiscountProduct(@Body() data: createDiscountProductDTO) {
    return this.discountProductService.create(data);
  }

  @Get()
  @UseGuards(AdminGuard)
  async getAll() {
    return this.discountProductService.getAll();
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async delete(@Param('id') id: string) {
    return await this.discountProductService.delete(id);
  }
}
