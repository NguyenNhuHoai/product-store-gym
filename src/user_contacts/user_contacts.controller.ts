import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserContactsService } from './user_contacts.service';
import { createUserContactDTO } from './dto/create_user_contact.dto';

@Controller('user-contacts')
export class UserContactsController {
  constructor(private readonly userContactService: UserContactsService) {}

  @Post()
  async createUserContact(@Body() data: createUserContactDTO) {
    return await this.userContactService.create(data);
  }

  @Get()
  async getAll() {
    return await this.userContactService.getAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: createUserContactDTO) {
    return await this.userContactService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userContactService.delete(id);
  }
}
