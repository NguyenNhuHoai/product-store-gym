import { Module } from '@nestjs/common';
import { UserContactsService } from './user_contacts.service';
import { UserContactsController } from './user_contacts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserContactModel } from './user_contacts.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([UserContactModel])],
  providers: [UserContactsService],
  controllers: [UserContactsController],
  exports: [UserContactsService],
})
export class UserContactsModule {}
