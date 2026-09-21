import { Module } from '@nestjs/common'
import { PrismaService } from '../../prisma.service.js'
import { CollaboratorsController } from './collaborators.controller.js'
import { CollaboratorsService } from './collaborators.service.js'

@Module({
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService, PrismaService],
})
export class CollaboratorsModule {}
