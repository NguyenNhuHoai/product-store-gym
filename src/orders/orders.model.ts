import {
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
import { UserContactModel } from 'src/user_contacts/user_contacts.model';
import { UserModel } from 'src/users/users.model';

@Table({
  tableName: 'orders',
  timestamps: true,
})
export class OrdersModel extends Model<OrdersModel> {
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

  @ForeignKey(() => UserContactModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  contact_id: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  total_amount: number;

  @Column({
    type: DataType.ENUM('pending', 'paid', 'shipped', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending',
  })
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';

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
