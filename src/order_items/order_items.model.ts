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
import { OrdersModel } from 'src/orders/orders.model';
import { ProductVariantModel } from 'src/product_variants/product_variants.model';
import { createOrderItemDTO } from './dto/create_order_item.dto';

@Table({
  tableName: 'order_item',
  timestamps: true,
})
export class OrderItemModel extends Model<OrderItemModel, createOrderItemDTO> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @ForeignKey(() => OrdersModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  order_id: string;

  @ForeignKey(() => ProductVariantModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  productVariant_id: string;

  @BelongsTo(() => ProductVariantModel, {
    foreignKey: 'productVariant_id',
    onDelete: 'CASCADE',
  })
  product_variant: ProductVariantModel;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price_at_purchase: number;

  @BelongsTo(() => OrdersModel, {
    onDelete: 'CASCADE',
  })
  order: OrdersModel;

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
