import {
  Column,
  CreatedAt,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { CartModel } from 'src/cart/cart.model';
import { UserContactModel } from 'src/user_contacts/user_contacts.model';
import { createUserDTO } from './dto/create_user.dto';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class UserModel extends Model<UserModel, createUserDTO> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare password_hash: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare is_admin: boolean;

  @HasMany(() => UserContactModel, {
    as: 'userContacts',
    onDelete: 'CASCADE',
    hooks: true,
  })
  userContacts: UserContactModel[];

  @HasMany(() => CartModel)
  carts: CartModel[];

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
