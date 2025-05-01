import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserModel } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { createUserDTO } from './dto/create_user.dto';

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

  async getAll() {
    const users = await this.userModel.findAll();
    return {
      status: 200,
      message: 'Get all user success',
      users: users,
    };
  }

  async findUserById(id: string) {
    const user = await this.userModel.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return {
        status: 404,
        message: 'User not found',
      };
    }
    return {
      status: 200,
      message: 'Get user success',
      data: user,
    };
  }

  async delete(id: string) {
    const userDelete = await this.userModel.destroy({
      where: {
        id,
      },
    });
    if (userDelete === 0) {
      return {
        status: 404,
        message: 'User not found',
      };
    }
    return {
      status: 200,
      message: 'Delete user success',
    };
  }

  async update(id: string, data: createUserDTO) {
    const [update] = await this.userModel.update(
      {
        name: data.name,
        password_hash: data.password_hash,
        is_admin: data.is_admin,
      },
      {
        where: {
          id,
        },
      },
    );
    if (update === 0) {
      throw new NotFoundException('User not found');
    }
    const updateUser = await this.userModel.findOne({
      where: { id },
    });
    return {
      status: 200,
      message: 'Update user success',
      user: updateUser,
    };
  }
}
