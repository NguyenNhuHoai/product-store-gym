import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ReviewsModel } from 'src/reviews/reviews.model';
import { createReviewImageDTO } from './dto/create_review_image.dto';

@Table({
  tableName: 'review_images',
  timestamps: true,
})
export class ReviewImagesModel extends Model<
  ReviewImagesModel,
  createReviewImageDTO
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @ForeignKey(() => ReviewsModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  review_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  images_url: string;

  @BelongsTo(() => ReviewsModel, {
    foreignKey: 'review_id',
    onDelete: 'CASCADE',
  })
  review: ReviewsModel;
}
