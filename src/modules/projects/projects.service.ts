import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service.js'
import { ProjectRequestDTO } from './projects.dto.js'

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany()
  }

  findById(id: string) {
    return this.prisma.project.findFirst({
      where: { id: id },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updateAt: true,
        tasks: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            priority: true,
            dueDate: true,
            createdAt: true,
            updateAt: true,
          },
        },
      },
    })
  }

  create(data: ProjectRequestDTO) {
    return this.prisma.project.create({
      data: {
        ...data,
        createdById: '123', // TODO - REMOVER QUANDO TIVER AUTENTICAÇÃO
      },
    })
  }

  update(id: string, data: ProjectRequestDTO) {
    return this.prisma.project.update({
      where: {
        id: id,
      },
      data: data,
    })
  }

  async remove(id: string) {
    await this.prisma.task.deleteMany({ where: { projectId: id } })

    return await this.prisma.project.delete({
      where: { id },
    })
  }
}
