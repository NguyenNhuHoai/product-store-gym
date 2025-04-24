import { Module } from '@nestjs/common';
import { ProductVariantsService } from './product_variants.service';
import { ProductVariantsController } from './product_variants.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductVariantModel } from './product_variants.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductVariantModel])],
  providers: [ProductVariantsService],
  controllers: [ProductVariantsController],
  exports: [ProductVariantsService],
})
export class ProductVariantsModule {}
