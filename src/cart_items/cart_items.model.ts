import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { CartModel } from 'src/cart/cart.model';
import { ProductVariantModel } from 'src/product_variants/product_variants.model';

@Table({
  tableName: 'cart_items',
  timestamps: true,
})
export class CartItemsModel extends Model<CartItemsModel> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @ForeignKey(() => CartModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  cart_id: string;

  @ForeignKey(() => ProductVariantModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  product_variant_id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @CreatedAt
  @Column({
    field: 'create_at',
    type: DataType.DATE,
  })
  created_at: Date;

  @UpdatedAt
  @Column({
    field: 'update_at',
    type: DataType.DATE,
  })
  update_at: Date;

  @HasMany(() => ProductVariantModel)
  products_variant: ProductVariantModel[];

  @BelongsTo(() => CartModel, {
    foreignKey: 'cart_id',
    onDelete: 'CASCADE',
  })
  cart: CartModel;
}
