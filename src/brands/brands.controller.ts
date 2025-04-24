import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { createBrandsDTO } from './dto/create_brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandService: BrandsService) {}

  @Get()
  findAll() {
    return this.brandService.findAllBrand();
  }

  @Get(':id')
  findId(@Param('id') id: string) {
    return this.brandService.findBrandById(id);
  }

  @Post()
  create(@Body() data: createBrandsDTO) {
    return this.brandService.createBrand(data);
  }

  @Delete(':id')
  deleteBrand(@Param('id') id: string) {
    return this.brandService.deleteBrand(id);
  }

  @Put(':id')
  updateBrand(@Param('id') id: string, @Body() data: createBrandsDTO) {
    return this.brandService.updateBrand(id, data);
  }
}
