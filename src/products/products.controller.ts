import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { createProductDTO } from './dto/create_product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  createProduct(@Body() data: createProductDTO) {
    return this.productService.create(data);
  }

  @Get()
  getAllProduct(@Query('page') page = 1, @Query('limit') limit = 4) {
    return this.productService.getAll(page, limit);
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() data: createProductDTO) {
    return this.productService.updateProduct(id, data);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
