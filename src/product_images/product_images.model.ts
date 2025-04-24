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
import { ProductsModel } from 'src/products/products.model';

@Table({
  tableName: 'product_images',
  timestamps: true,
})
export class ProductImageModel extends Model<ProductImageModel> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @ForeignKey(() => ProductsModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  product_id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  image_url: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_main: boolean;

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

  @BelongsTo(() => ProductsModel, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
  })
  product: ProductsModel;
}
