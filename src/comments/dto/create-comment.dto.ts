import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  coffee_id: number;
  @IsString()
  author: string;
  @IsString()
  comment: string;
}
