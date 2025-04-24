import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createUserDTO } from 'src/users/dto/create_user.dto';
import { validateEmail } from 'src/function_helps/fcHelp';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    // private readonly authService: AuthService,
  ) {}

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async generateToken(payload: any, user: any) {
    const accessToken = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign(
      payload,
      `${process.env.JWT_REFRESH_SECRET}`,
      {
        expiresIn: '7d',
      },
    );
    const { password_hash, ...userWithoutPassword } = user?.dataValues;
    return { ...userWithoutPassword, accessToken, refreshToken };
  }

  async veryfyAccessToken(token: string) {
    return jwt.verify(token, `${process.env.JWT_SECRET}`);
  }

  async veryfyRefreshToken(token: string) {
    return jwt.verify(token, `${process.env.JWT_REFRESH_SECRET}`);
  }

  async register({ name, password_hash, email, is_admin }: createUserDTO) {
    if (!validateEmail(email)) {
      return {
        statusCode: 400,
        message: 'Email format is invalid',
        error: 'Bad Request',
      };
    }

    const userExists = await this.usersService.findEmailUser(email);
    if (userExists) {
      throw new BadRequestException('Email already exists');
    }

    password_hash = await this.hashPassword(password_hash);
    const newUser = await this.usersService.createUser({
      name,
      password_hash: password_hash,
      email,
      is_admin,
    });
    return {
      statusCode: 201,
      message: 'User registered successfully',
      data: newUser,
    };
  }

  async login(data: createUserDTO) {
    const user = await this.usersService.findEmailUser(data.email);
    if (!user) {
      throw new UnauthorizedException('Email is not defined');
    }

    if (!data.password_hash || !user?.dataValues?.password_hash) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isValid = await this.comparePassword(
      data.password_hash,
      user?.dataValues?.password_hash,
    );

    if (!isValid) throw new UnauthorizedException('Incorrect password');

    return await this.generateToken(data, user);
  }
}
