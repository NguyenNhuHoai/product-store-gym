import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductVariantsService } from './product_variants.service';
import { createProductVariantsDTO } from './dto/create_product_variants.dto';
import { AdminGuard } from 'src/auth/jwt-auth.guard';

@Controller('product-variants')
export class ProductVariantsController {
  constructor(private readonly productVariantService: ProductVariantsService) {}
  @Post()
  @UseGuards(AdminGuard)
  create(@Body() data: createProductVariantsDTO) {
    return this.productVariantService.createProductVariant(data);
  }

  @Get()
  @UseGuards(AdminGuard)
  getAll() {
    return this.productVariantService.getAllProductVariant();
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  findOne(@Param('id') id: string) {
    return this.productVariantService.findOneProductVariant(id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  update(@Body() data: createProductVariantsDTO, @Param('id') id: string) {
    return this.productVariantService.updateProductVariant(id, data);
  }
}
