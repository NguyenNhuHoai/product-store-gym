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
import { CartItemsModel } from 'src/cart_items/cart_items.model';
import { UserModel } from 'src/users/users.model';
import { createCarDTO } from './dto/create_car.dto';

@Table({
  tableName: 'cart',
  timestamps: true,
})
export class CartModel extends Model<CartModel, createCarDTO> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;

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

  @BelongsTo(() => UserModel, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  })
  user: UserModel;

  @HasMany(() => CartItemsModel)
  cart_item: CartItemsModel[];
}
