import { Test, TestingModule } from '@nestjs/testing';
import { DiscountProductService } from './discount_product.service';

describe('DiscountProductService', () => {
  let service: DiscountProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscountProductService],
    }).compile();

    service = module.get<DiscountProductService>(DiscountProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
