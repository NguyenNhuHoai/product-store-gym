import {
  Column,
  CreatedAt,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { ProductsModel } from 'src/products/products.model';
import { createBrandsDTO } from './dto/create_brand.dto';

@Table({
  tableName: 'brands',
  timestamps: true,
})
export class BrandModel extends Model<BrandModel, createBrandsDTO> {
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

  @HasMany(() => ProductsModel)
  products: ProductsModel[];

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

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
