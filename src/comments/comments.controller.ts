import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Public()
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.commentsService.findAll(paginationQuery);
  }

  @Public()
  @Get('coffee/:id')
  findOneByCoffeId(@Param('id') coffeId: number) {
    return this.commentsService.findOneByCoffeeId(coffeId);
  }

  @Public()
  @Post()
  create(@Body() comment: CreateCommentDto) {
    return this.commentsService.create(comment);
  }
}
