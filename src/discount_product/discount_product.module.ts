import { Module } from '@nestjs/common';
import { DiscountProductController } from './discount_product.controller';
import { DiscountProductService } from './discount_product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiscountProductModel } from './discount_product.model';

@Module({
  imports: [SequelizeModule.forFeature([DiscountProductModel])],
  controllers: [DiscountProductController],
  providers: [DiscountProductService],
})
export class DiscountProductModule {}
