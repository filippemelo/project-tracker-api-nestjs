import { Module } from '@nestjs/common'
import { createObserveModule } from '@nestjs/observe'
import { AppController } from './app.controller.js'
import { AppService } from './app.service.js'
import { ProjectsModule } from './modules/projects/projects.module.js'
import { PrismaService } from './prisma.service.js'

export const { ObserveModule, ObserveInstrument } = createObserveModule()

@Module({
  imports: [ProjectsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
