import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { createBrandsDTO } from './dto/create_brand.dto';
import { AdminGuard } from 'src/auth/jwt-auth.guard';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandService: BrandsService) {}

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.brandService.findAllBrand();
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  findId(@Param('id') id: string) {
    return this.brandService.findBrandById(id);
  }

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() data: createBrandsDTO) {
    return this.brandService.createBrand(data);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  deleteBrand(@Param('id') id: string) {
    return this.brandService.deleteBrand(id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  updateBrand(@Param('id') id: string, @Body() data: createBrandsDTO) {
    return this.brandService.updateBrand(id, data);
  }
}
