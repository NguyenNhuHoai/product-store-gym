import { Injectable, NotFoundException } from '@nestjs/common';
import { BrandModel } from './brands.model';
import { InjectModel } from '@nestjs/sequelize';
import { createBrandsDTO } from './dto/create_brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(BrandModel)
    private readonly brandModel: typeof BrandModel,
  ) {}

  async findAllBrand() {
    return await this.brandModel.findAll({ include: { all: true } });
  }

  async findBrandById(id: string) {
    const brand = await this.brandModel.findByPk(id);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return brand;
  }

  async createBrand(data: createBrandsDTO) {
    return await this.brandModel.create(data);
  }

  async deleteBrand(id: string) {
    const deleteB = await this.brandModel.destroy({ where: { id: id } });
    if (deleteB === 0) {
      throw new NotFoundException('Brand not founds ID');
    }
    return {
      message: 'Brand delete success',
      success: true,
      deleteB,
    };
  }

  async updateBrand(id: string, data: createBrandsDTO) {
    const [updateB] = await this.brandModel.update(
      {
        name: data.name,
        description: data.description,
      },
      {
        where: { id: id },
      },
    );
    if (updateB === 0) {
      throw new NotFoundException('Brand not founds ID');
    }
    return {
      message: 'Brand update success',
      success: true,
      updateB,
    };
  }
}
