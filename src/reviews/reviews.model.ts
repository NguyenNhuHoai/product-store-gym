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
} from 'sequelize-typescript';
import { OrdersModel } from 'src/orders/orders.model';
import { ProductsModel } from 'src/products/products.model';
import { ReviewImagesModel } from 'src/review_images/review_images.model';
import { UserModel } from 'src/users/users.model';

@Table({
  tableName: 'reviews',
  timestamps: true,
})
export class ReviewsModel extends Model<ReviewsModel> {
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

  @ForeignKey(() => ProductsModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  product_id: string;

  @ForeignKey(() => OrdersModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  order_id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  })
  rating: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  comment: string;

  @CreatedAt
  @Column({
    field: 'created_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  created_at: Date;

  @BelongsTo(() => UserModel, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  })
  user: UserModel;

  @BelongsTo(() => ProductsModel)
  product: ProductsModel;

  @HasMany(() => ReviewImagesModel, { onDelete: 'CASCADE' })
  images: ReviewImagesModel[];
}
