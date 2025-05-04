import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DiscountCodesService } from './discount_codes.service';
import { createDiscountCodeDTO } from './dto/create_discount_codes.dto';
import { AdminGuard } from 'src/auth/jwt-auth.guard';

@Controller('discount-codes')
export class DiscountCodesController {
  constructor(private readonly discountCodeService: DiscountCodesService) {}
  @Post()
  @UseGuards(AdminGuard)
  async createCartItem(@Body() data: createDiscountCodeDTO) {
    return this.discountCodeService.create(data);
  }

  @Get()
  @UseGuards(AdminGuard)
  async getAll() {
    return this.discountCodeService.getAll();
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async delete(@Param('id') id: string) {
    return await this.discountCodeService.delete(id);
  }
}
