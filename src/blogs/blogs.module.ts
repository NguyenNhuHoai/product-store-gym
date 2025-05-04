import { Module } from '@nestjs/common';
import { BlogController } from './blogs.controller';
import { BlogService } from './blogs.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogsModel } from './blogs.model';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
@Module({
  imports: [
    SequelizeModule.forFeature([BlogsModel]),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // Định nghĩa URL mà client sẽ sử dụng để truy cập các tệp
    }),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
