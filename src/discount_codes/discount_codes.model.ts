import {
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { DiscountProductModel } from 'src/discount_product/discount_product.model';
import { ProductsModel } from 'src/products/products.model';
import { createDiscountCodeDTO } from './dto/create_discount_codes.dto';

@Table({
  tableName: 'discount_codes',
  timestamps: true,
})
export class DiscountCodesModel extends Model<
  DiscountCodesModel,
  createDiscountCodeDTO
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Unique
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataType.ENUM('percentage', 'fixed'),
    allowNull: false,
    defaultValue: 'percentage',
  })
  discount_type: 'percentage' | 'fixed';

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  discount_value: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_date: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end_date: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @BelongsToMany(() => ProductsModel, () => DiscountProductModel)
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
  update_at: Date;
}
