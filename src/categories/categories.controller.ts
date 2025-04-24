import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { createCategoryDTO } from './dto/create_category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() data: createCategoryDTO) {
    return this.categoriesService.createCategories(data);
  }

  @Get()
  getAll() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.categoriesService.getOneCategory(id);
  }

  @Put(':id')
  updateCategory(@Param('id') id: string, @Body() data: createCategoryDTO) {
    return this.categoriesService.updateCategory(id, data);
  }
}
