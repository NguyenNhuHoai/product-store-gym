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
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { CartItemsModel } from 'src/cart_items/cart_items.model';
import { ProductsModel } from 'src/products/products.model';
import { createProductVariantsDTO } from './dto/create_product_variants.dto';
import { OrderItemModel } from 'src/order_items/order_items.model';

@Table({
  tableName: 'product_variants',
  timestamps: true,
})
export class ProductVariantModel extends Model<
  ProductVariantModel,
  createProductVariantsDTO
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => ProductsModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  product_id: string;

  @BelongsTo(() => ProductsModel, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
  })
  product: ProductsModel;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  size: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  stock_quantity: number;

  @Column({
    type: DataType.STRING,
  })
  sku: string;

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

  @HasMany(() => CartItemsModel)
  cart_items: CartItemsModel[];

  @BelongsTo(() => ProductsModel)
  products_id: ProductsModel;

  @HasMany(() => OrderItemModel)
  order_items: OrderItemModel[];
}
