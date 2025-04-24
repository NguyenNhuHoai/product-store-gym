import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  Unique,
  HasMany,
} from 'sequelize-typescript';
import { ProductsModel } from 'src/products/products.model';
import { createCategoryDTO } from './dto/create_category.dto';

@Table({
  tableName: 'categories',
  timestamps: true,
})
export class CategoryModel extends Model<CategoryModel, createCategoryDTO> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @Unique
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @Unique
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  slug: string;

  @ForeignKey(() => CategoryModel)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  parent_id: string;

  @HasMany(() => CategoryModel, 'parent_id')
  children: CategoryModel[];

  @HasMany(() => ProductsModel)
  products: ProductsModel[];

  @CreatedAt
  @Column({
    field: 'created_at',
    type: DataType.DATE,
  })
  created_at: Date;

  @UpdatedAt
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
  })
  updated_at: Date;
}
