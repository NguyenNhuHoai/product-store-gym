import { Module } from '@nestjs/common';
import { CartItemsController } from './cart_items.controller';
import { CartItemsService } from './cart_items.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartItemsModel } from './cart_items.model';

@Module({
  imports: [SequelizeModule.forFeature([CartItemsModel])],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
