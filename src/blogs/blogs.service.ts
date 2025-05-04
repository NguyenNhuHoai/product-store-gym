import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BlogsModel } from './blogs.model';
import { createBlogDto } from './dto/create_blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogsModel)
    private readonly blogModel: typeof BlogsModel,
  ) {}

  async create(data: {
    title: string;
    content: string;
    thumbnail_url: string;
  }) {
    const newBlog = await this.blogModel.create(data);
    return {
      message: 'Upload thành công',
      data: newBlog,
    };
  }

  async getAll() {
    try {
      const blogs = await this.blogModel.findAll();
      return {
        status: 200,
        message: 'Get all success!',
        blogs: blogs,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id: string) {
    try {
      const blog = await this.blogModel.findOne({ where: { id } });
      if (!blog) {
        throw new NotFoundException('Blog does not exist!');
      }

      const deleted = await this.blogModel.destroy({ where: { id } });
      if (deleted === 0) {
        throw new InternalServerErrorException('Failed to Blog!');
      }

      return {
        status: 200,
        message: 'Deleted Blog successfully!',
      };
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: createBlogDto) {
    const existingBlog = await this.blogModel.findOne({
      where: { id },
    });
    if (!existingBlog) {
      throw new NotFoundException('Blog post not found');
    }
    const [updatedCount] = await this.blogModel.update(
      {
        title: data.title,
        content: data.content,
        thumbnail_url: data.thumbnail_url || existingBlog.thumbnail_url,
      },
      {
        where: { id },
      },
    );
    if (updatedCount === 0) {
      return {
        status: 404,
        message: 'No changes were made or Blog post not found',
      };
    }
    const updatedBlogItem = await this.blogModel.findByPk(id);
    return {
      status: 200,
      message: 'Blog post updated successfully!',
      blog: updatedBlogItem,
    };
  }
}
