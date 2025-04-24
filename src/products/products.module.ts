import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsModel } from './products.model';
import { ProductVariantsModule } from 'src/product_variants/product_variants.module';
import { ProductVariantModel } from 'src/product_variants/product_variants.model';

@Module({
  imports: [
    SequelizeModule.forFeature([ProductsModel, ProductVariantModel]),
    ProductVariantsModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
