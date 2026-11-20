import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { ValidateResourcesIds } from '../../common/decorators/validate-resourses-ids.decorator.js'
import { QueryPaginationDTO } from '../../common/dtos/query-pagination.dto.js'
import { JwtAuthGuard } from '../../common/guards/jwt-auth/jwt-auth.guard.js'
import { ValidateResoursesIdsInterceptor } from '../../common/interceptors/validate-resourses-ids.interceptor.js'
import { ApiPaginatedResponse } from '../../common/swagger/api-paginated-response.js'
import { CommentFullDTO, CommentListItemDTO, CommentRequestDTO } from './comments.dto.js'
import { CommentsService } from './comments.service.js'

@Controller({
  version: '1',
  path: 'projects/:projectId/tasks/:taskId/comments',
})
@UseInterceptors(ValidateResoursesIdsInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('jwt')
export class CommentsController {
  constructor(private readonly commentSerivce: CommentsService) {}

  @Get()
  @ValidateResourcesIds()
  @ApiPaginatedResponse(CommentListItemDTO)
  findAllByTask(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Query() query?: QueryPaginationDTO,
  ) {
    return this.commentSerivce.findAllByTask(taskId, query)
  }

  @Get(':commentId')
  @ValidateResourcesIds()
  @ApiOkResponse({ type: CommentFullDTO, description: 'Get comment by Id' })
  findOne(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ) {
    return this.commentSerivce.findById(taskId, commentId)
  }

  @Post()
  @ValidateResourcesIds()
  @ApiCreatedResponse({ type: CommentListItemDTO, description: 'Create a new comment' })
  @HttpCode(HttpStatus.CREATED)
  create(@Param('taskId', ParseUUIDPipe) taskId: string, @Body() data: CommentRequestDTO) {
    return this.commentSerivce.create(taskId, data)
  }

  @Put(':commentId')
  @ValidateResourcesIds()
  @ApiOkResponse({ type: CommentListItemDTO, description: 'Update a comment' })
  @HttpCode(HttpStatus.OK)
  update(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Body() data: CommentRequestDTO,
  ) {
    return this.commentSerivce.update(taskId, commentId, data)
  }

  @Delete(':commentId')
  @ValidateResourcesIds()
  @ApiNoContentResponse({ description: 'Delete a comment' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ) {
    return this.commentSerivce.remove(taskId, commentId)
  }
}
