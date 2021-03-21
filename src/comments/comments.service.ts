import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comments } from './entities/comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto): Promise<Comments[]> {
    const { limit, offset } = paginationQuery;
    return this.commentsModel.find().skip(offset).limit(limit).exec();
  }

  async findOneByCoffeeId(coffee_id: number): Promise<Comments> {
    return this.commentsModel.findOne({ coffee_id }).exec();
  }

  async create(commentDto: CreateCommentDto): Promise<Comments> {
    const comment = { ...commentDto, date: new Date() };
    const createdComment = new this.commentsModel(comment);
    return createdComment.save();
  }
}
