import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BrandModel } from './brands.model';

@Module({
  imports: [SequelizeModule.forFeature([BrandModel])],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService],
})
export class BrandsModule {}
