import { Body, Controller, NotAcceptableException, Post } from '@nestjs/common';
import { createUserDTO } from './dto/create_user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
}
