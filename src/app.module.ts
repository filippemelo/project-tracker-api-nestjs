import { Module } from '@nestjs/common'
import { createObserveModule } from '@nestjs/observe'
import { AppController } from './app.controller.js'
import { AppService } from './app.service.js'
import { ProjectsModule } from './modules/projects/projects.module.js'
import { TasksModule } from './modules/tasks/tasks.module.js'
import { PrismaService } from './prisma.service.js'
import { UsersModule } from './modules/users/users.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule()

@Module({
  imports: [ProjectsModule, TasksModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
