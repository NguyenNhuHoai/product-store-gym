import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { createProductDTO } from './dto/create_product.dto';
import { AdminGuard } from 'src/auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @UseGuards(AdminGuard)
  createProduct(@Body() data: createProductDTO) {
    return this.productService.create(data);
  }

  @Get()
  @UseGuards(AdminGuard)
  getAllProduct(@Query('page') page = 1, @Query('limit') limit = 4) {
    return this.productService.getAll(page, limit);
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  findOneProduct(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  updateProduct(@Param('id') id: string, @Body() data: createProductDTO) {
    return this.productService.updateProduct(id, data);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
