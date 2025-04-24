import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartModel } from './cart.model';

@Module({
  imports: [SequelizeModule.forFeature([CartModel])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
