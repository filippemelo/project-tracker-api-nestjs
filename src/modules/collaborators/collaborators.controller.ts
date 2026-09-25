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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiNoContentResponse, ApiResponse } from '@nestjs/swagger'
import { ValidateResourcesIds } from '../../common/decorators/validate-resourses-ids.decorator.js'
import { JwtAuthGuard } from '../../common/guards/jwt-auth/jwt-auth.guard.js'
import { ValidateResoursesIdsInterceptor } from '../../common/interceptors/validate-resourses-ids.interceptor.js'
import {
  AddCollaboratorDTO,
  CollaboratorListItemDTO,
  UpdateCollaboratorDTO,
} from './collaborators.dto.js'
import { CollaboratorsService } from './collaborators.service.js'

@Controller({
  version: '1',
  path: 'projects/:projectId/collaborators',
})
@UseInterceptors(ValidateResoursesIdsInterceptor)
@UseGuards(JwtAuthGuard)
export class CollaboratorsController {
  constructor(private readonly collaboratorService: CollaboratorsService) {}

  @Get()
  @ValidateResourcesIds()
  @ApiResponse({ type: [CollaboratorListItemDTO] })
  findAllByProject(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return this.collaboratorService.findByAllProject(projectId)
  }

  @Post()
  @ValidateResourcesIds()
  @ApiCreatedResponse({ type: CollaboratorListItemDTO })
  @HttpCode(HttpStatus.CREATED)
  create(@Param('projectId', ParseUUIDPipe) projectId: string, @Body() data: AddCollaboratorDTO) {
    return this.collaboratorService.create(projectId, data)
  }

  @Put(':userId')
  @ValidateResourcesIds()
  @ApiCreatedResponse({ type: CollaboratorListItemDTO })
  update(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() data: UpdateCollaboratorDTO,
  ) {
    return this.collaboratorService.update(projectId, userId, data)
  }

  @Delete(':userId')
  @ValidateResourcesIds()
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.collaboratorService.remove(projectId, userId)
  }
}
