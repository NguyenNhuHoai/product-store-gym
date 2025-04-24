import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductVariantsService } from './product_variants.service';
import { createProductVariantsDTO } from './dto/create_product_variants.dto';

@Controller('product-variants')
export class ProductVariantsController {
  constructor(private readonly productVariantService: ProductVariantsService) {}
  @Post()
  create(@Body() data: createProductVariantsDTO) {
    return this.productVariantService.createProductVariant(data);
  }

  @Get()
  getAll() {
    return this.productVariantService.getAllProductVariant();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productVariantService.findOneProductVariant(id);
  }

  @Put(':id')
  update(@Body() data: createProductVariantsDTO, @Param('id') id: string) {
    return this.productVariantService.updateProductVariant(id, data);
  }
}
