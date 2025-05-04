import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { createUserDTO } from './dto/create_user.dto';
import { UsersService } from './users.service';
import { AdminGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AdminGuard)
  @Get('')
  async getAllUser() {
    const users = await this.userService.getAll();
    return users;
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.findUserById(id);
    return user;
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async deteleUserById(@Param('id') id: string) {
    const userDelete = await this.userService.delete(id);
    return userDelete;
  }
}
