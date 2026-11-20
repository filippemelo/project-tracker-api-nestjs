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
import { TaskListItemDTO, TaskRequestDTO } from './tasks.dto.js'
import { TasksService } from './tasks.service.js'

@Controller({
  version: '1',
  path: 'projects/:projectId/tasks',
})
@UseInterceptors(ValidateResoursesIdsInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('jwt')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ValidateResourcesIds()
  @ApiPaginatedResponse(TaskListItemDTO)
  findAllByProject(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Query() query?: QueryPaginationDTO,
  ) {
    return this.tasksService.findAllByProject(projectId, query)
  }

  @Post()
  @ValidateResourcesIds()
  @ApiCreatedResponse({ type: TaskListItemDTO })
  @HttpCode(HttpStatus.CREATED)
  create(@Param('projectId', ParseUUIDPipe) projectId: string, @Body() data: TaskRequestDTO) {
    return this.tasksService.create(projectId, data)
  }

  @Get(':taskId')
  @ValidateResourcesIds()
  findOne(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return this.tasksService.findById(projectId, taskId)
  }

  @Put(':taskId')
  @ValidateResourcesIds()
  @ApiOkResponse({ type: TaskListItemDTO })
  @HttpCode(HttpStatus.OK)
  update(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() data: TaskRequestDTO,
  ) {
    return this.tasksService.update(projectId, taskId, data)
  }

  @Delete(':taskId')
  @ValidateResourcesIds()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Task deleted successfully' })
  remove(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return this.tasksService.delete(projectId, taskId)
  }
}
