import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';
import { UserContactsModule } from './user_contacts/user_contacts.module';
import { BrandsController } from './brands/brands.controller';
import { OrderItemsModule } from './order_items/order_items.module';
import { OrdersModule } from './orders/orders.module';
import { CartItemsModule } from './cart_items/cart_items.module';
import { CartModule } from './cart/cart.module';
import { ProductImagesModule } from './product_images/product_images.module';
import { ProductVariantsModule } from './product_variants/product_variants.module';
import { ProductsModule } from './products/products.module';

import { BrandsService } from './brands/brands.service';
import { DiscountCodesModule } from './discount_codes/discount_codes.module';
import { DiscountProductModule } from './discount_product/discount_product.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ReviewImagesModule } from './review_images/review_images.module';
import { BlogModule } from './blogs/blogs.module';
import { BrandsModule } from './brands/brands.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '26032001',
      database: 'gym_sport',
      autoLoadModels: true,
      synchronize: true,
    }),
    ProductImagesModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'), // Đường dẫn đến thư mục chứa file tĩnh
      serveRoot: '/uploads', // URL prefix để truy cập ảnh
    }),
    UsersModule,
    CategoriesModule,
    UserContactsModule,
    BrandsModule,
    ProductsModule,
    ProductVariantsModule,
    ProductImagesModule,
    CartModule,
    CartItemsModule,
    OrdersModule,
    OrderItemsModule,
    DiscountCodesModule,
    DiscountProductModule,
    ReviewsModule,
    ReviewImagesModule,
    BlogModule,
    AuthModule,
  ],
  controllers: [AppController, BrandsController],
  providers: [AppService],
})
export class AppModule {}
