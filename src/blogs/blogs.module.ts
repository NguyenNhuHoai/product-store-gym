import { Module } from '@nestjs/common';
import { BlogController } from './blogs.controller';
import { BlogService } from './blogs.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogsModel } from './blogs.model';

@Module({
  imports: [SequelizeModule.forFeature([BlogsModel])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
