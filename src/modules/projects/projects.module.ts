import { Module } from '@nestjs/common'
import { PrismaService } from '../../prisma.service.js'
import { ProjectsController } from './projects.controller.js'
import { ProjectsService } from './projects.service.js'

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService],
})
export class ProjectsModule {}
