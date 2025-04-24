import { Module } from '@nestjs/common';
import { DiscountCodesService } from './discount_codes.service';
import { DiscountCodesController } from './discount_codes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiscountCodesModel } from './discount_codes.model';

@Module({
  imports: [SequelizeModule.forFeature([DiscountCodesModel])],
  providers: [DiscountCodesService],
  controllers: [DiscountCodesController],
})
export class DiscountCodesModule {}
