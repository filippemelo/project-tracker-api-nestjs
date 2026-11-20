import { Module } from '@nestjs/common'
import { CommonModule } from '../../common/common.module.js'
import { RequestContextService } from '../../common/services/request-context/request-context.service.js'
import { PrismaService } from '../../prisma.service.js'
import { CommentsController } from './comments.controller.js'
import { CommentsService } from './comments.service.js'

@Module({
  imports: [CommonModule],
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, RequestContextService],
})
export class CommentsModule {}
