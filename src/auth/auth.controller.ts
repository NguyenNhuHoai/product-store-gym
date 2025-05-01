import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { createUserDTO } from 'src/users/dto/create_user.dto';
import { AuthService } from './auth.service';
import { validateEmail } from 'src/function_helps/fcHelp';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}
  @Post('register')
  async register(@Body() data: createUserDTO) {
    return this.authservice.register(data);
  }

  @Post('login')
  async(@Body() data: createUserDTO) {
    return this.authservice.login(data);
  }

  @Put('update/:id')
  async updateUser(@Param('id') id: string, @Body() data: createUserDTO) {
    const update = await this.authservice.update(id, data);
    return update;
  }
}
