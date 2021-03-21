import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Comments extends Document {
  @Prop({ required: true, index: true })
  coffee_id: number;
  @Prop({ required: true })
  author: string;
  @Prop({ required: true })
  comment: string;
  @Prop({ default: 0 })
  rating: number;
  @Prop()
  date: Date;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
CommentsSchema.index({ author: 1, comment: -1 });

/**
 * In this example:
 * We passed a value of 1 (to author) which specifies that the index
 * should order these items in an Ascending order.
 *
 * We passed type a value of (negative) -1 which specifies that
 * The index should order these items in Descending order.
 */
