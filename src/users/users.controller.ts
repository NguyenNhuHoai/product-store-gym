import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { createUserDTO } from './dto/create_user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  async getAllUser() {
    const users = await this.userService.getAll();
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.findUserById(id);
    return user;
  }

  @Delete(':id')
  async deteleUserById(@Param('id') id: string) {
    const userDelete = await this.userService.delete(id);
    return userDelete;
  }
}
