import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './blogs.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { createBlogDto } from './dto/create_blog.dto';
import { AdminGuard } from 'src/auth/jwt-auth.guard';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${uuidv4()}${path.extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: createBlogDto,
  ) {
    const imageUrl = `uploads/${file.filename}`;
    return await this.blogService.create({
      title: body.title,
      content: body.content,
      thumbnail_url: imageUrl,
    });
  }

  @Get()
  @UseGuards(AdminGuard)
  async getAll() {
    return this.blogService.getAll();
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async delete(@Param('id') id: string) {
    return await this.blogService.delete(id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${uuidv4()}${path.extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: createBlogDto,
    @Param('id') id: string,
  ) {
    let imageUrl: string = body.thumbnail_url || '';
    console.log(uuidv4());
    if (file) {
      imageUrl = `uploads/${file.filename}`;
    }
    return await this.blogService.update(id, {
      title: body.title,
      content: body.content,
      thumbnail_url: imageUrl,
    });
  }
}
