import { Test, TestingModule } from '@nestjs/testing';
import { UserContactsController } from './user_contacts.controller';

describe('UserContactsController', () => {
  let controller: UserContactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserContactsController],
    }).compile();

    controller = module.get<UserContactsController>(UserContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
