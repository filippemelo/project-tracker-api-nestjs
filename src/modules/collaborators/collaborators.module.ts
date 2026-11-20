import { Module } from '@nestjs/common'
import { CommonModule } from '../../common/common.module.js'
import { RequestContextService } from '../../common/services/request-context/request-context.service.js'
import { PrismaService } from '../../prisma.service.js'
import { CollaboratorsController } from './collaborators.controller.js'
import { CollaboratorsService } from './collaborators.service.js'

@Module({
  imports: [CommonModule],
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService, PrismaService, RequestContextService],
})
export class CollaboratorsModule {}
