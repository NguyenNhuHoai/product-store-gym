import { Module } from '@nestjs/common';
import { UserContactsService } from './user_contacts.service';
import { UserContactsController } from './user_contacts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserContactModel } from './user_contacts.model';

@Module({
  imports: [SequelizeModule.forFeature([UserContactModel])],
  providers: [UserContactsService],
  controllers: [UserContactsController],
})
export class UserContactsModule {}
