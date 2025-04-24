import { Test, TestingModule } from '@nestjs/testing';
import { DiscountProductController } from './discount_product.controller';

describe('DiscountProductController', () => {
  let controller: DiscountProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountProductController],
    }).compile();

    controller = module.get<DiscountProductController>(DiscountProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
