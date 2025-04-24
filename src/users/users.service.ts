import { BadRequestException, Injectable } from '@nestjs/common';
import { UserModel } from './users.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
  ) {}

  async findEmailUser(email) {
    return await this.userModel.findOne({
      where: {
        email: email,
      },
    });
  }

  async createUser({ name, password_hash, email, is_admin }) {
    return await this.userModel.create({
      name,
      password_hash,
      email,
      is_admin,
    });
  }
}
