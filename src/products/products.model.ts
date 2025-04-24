import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { BrandModel } from 'src/brands/brands.model';
import { CategoryModel } from 'src/categories/category.model';
import { DiscountCodesModel } from 'src/discount_codes/discount_codes.model';
import { DiscountProductModel } from 'src/discount_product/discount_product.model';
import { ProductImageModel } from 'src/product_images/product_images.model';
import { ProductVariantModel } from 'src/product_variants/product_variants.model';
import { createProductDTO } from './dto/create_product.dto';

@Table({
  tableName: 'products',
  timestamps: true,
})
export class ProductsModel extends Model<ProductsModel, createProductDTO> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @ForeignKey(() => BrandModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  brand_id: string;

  @ForeignKey(() => CategoryModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  category_id: string;

  @Unique
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  status: boolean;

  @CreatedAt
  @Column({
    field: 'created_at',
    type: DataType.DATE,
  })
  created_at: Date;

  @ForeignKey(() => ProductVariantModel)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  product_variant: string;

  @UpdatedAt
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
  })
  updated_at: Date;

  @HasMany(() => ProductVariantModel, {
    as: 'productVariants',
    onDelete: 'CASCADE',
    hooks: true,
  })
  productVariants: ProductVariantModel[];

  @HasMany(() => ProductImageModel)
  product_image: ProductImageModel[];

  @BelongsToMany(() => DiscountCodesModel, () => DiscountProductModel)
  discountCodes: DiscountCodesModel[];

  @BelongsTo(() => CategoryModel)
  category: CategoryModel;

  @BelongsTo(() => BrandModel)
  brand: BrandModel;
}
