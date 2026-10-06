import { Module } from '@nestjs/common'
import { CommonModule } from '../../common/common.module.js'
import { PrismaService } from '../../prisma.service.js'
import { UsersController } from './users.controller.js'
import { UsersService } from './users.service.js'

@Module({
  imports: [CommonModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
