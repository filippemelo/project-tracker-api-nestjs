import { Module } from '@nestjs/common'
import { CommonModule } from '../../common/common.module.js'
import { PrismaService } from '../../prisma.service.js'
import { CommentsController } from './comments.controller.js'
import { CommentsService } from './comments.service.js'

@Module({
  imports: [CommonModule],
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService],
})
export class CommentsModule {}
