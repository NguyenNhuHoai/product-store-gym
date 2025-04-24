import { Body, Get, Injectable } from '@nestjs/common';
import { CategoryModel } from './category.model';
import { InjectModel } from '@nestjs/sequelize';
import { createCategoryDTO } from './dto/create_category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(CategoryModel)
    private readonly categoryModel: typeof CategoryModel,
  ) {}

  async createCategories(data: createCategoryDTO) {
    const category = await this.categoryModel.create(data);
    return {
      status: 200,
      message: 'create category success!',
      category: category,
    };
  }

  async getAllCategories() {
    const categories = await this.categoryModel.findAll({
      include: [{ model: this.categoryModel, as: 'children' }],
    });
    return {
      status: 200,
      message: 'get all categories success!',
      categories: categories,
    };
  }

  async getOneCategory(id: string) {
    const category = await this.categoryModel.findOne({
      where: {
        id: id,
      },
      include: [{ model: this.categoryModel, as: 'children' }],
    });
    return {
      status: 200,
      message: 'get category success!',
      category: category,
    };
  }

  async updateCategory(id: string, data: createCategoryDTO) {
    const category = await this.getOneCategory(id);
    if (!category) {
      return {
        status: '404',
        message: 'Category is not define',
      };
    }

    const [update] = await this.categoryModel.update(
      {
        name: data.name,
        slug: data.slug,
        parent_id: data.parent_id,
      },
      { where: { id: id } },
    );

    if (update === 0) {
      return {
        status: 404,
        message: 'Category not found or nothing changed',
      };
    }
    const updatedCategory = await this.categoryModel.findByPk(id, {
      include: [{ model: this.categoryModel, as: 'children' }],
    });

    return {
      status: '200',
      message: 'Category update success!',
      category_update: updatedCategory,
    };
  }
}
