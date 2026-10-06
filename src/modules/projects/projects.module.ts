import { Module } from '@nestjs/common'
import { CommonModule } from '../../common/common.module.js'
import { PrismaService } from '../../prisma.service.js'
import { ProjectsController } from './projects.controller.js'
import { ProjectsService } from './projects.service.js'

@Module({
  imports: [CommonModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService],
})
export class ProjectsModule {}
