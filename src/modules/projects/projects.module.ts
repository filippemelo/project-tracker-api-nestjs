import { Module } from '@nestjs/common'
import { RequestContextService } from '../../common/services/request-context/request-context.service.js'
import { PrismaService } from '../../prisma.service.js'
import { ProjectsController } from './projects.controller.js'
import { ProjectsService } from './projects.service.js'

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService, RequestContextService],
})
export class ProjectsModule {}
