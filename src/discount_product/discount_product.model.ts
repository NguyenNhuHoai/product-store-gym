import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { DiscountCodesModel } from 'src/discount_codes/discount_codes.model';
import { ProductsModel } from 'src/products/products.model';

@Table({
  tableName: 'discount_product',
  timestamps: true,
})
export class DiscountProductModel extends Model<DiscountProductModel> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @ForeignKey(() => DiscountCodesModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  discount_id: string;

  @ForeignKey(() => ProductsModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  product_id: string;

  @BelongsTo(() => DiscountCodesModel, {
    foreignKey: 'discount_id',
    onDelete: 'CASCADE',
  })
  discountCode: DiscountCodesModel;

  @BelongsTo(() => ProductsModel, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
  })
  product: ProductsModel;

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
