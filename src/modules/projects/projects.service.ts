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
      where: {
        id: id,
      },
    })
  }

  create(data: ProjectRequestDTO) {
    return this.prisma.project.create({
      data: data,
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

  remove(id: string) {
    return this.prisma.project.delete({
      where: {
        id,
      },
    })
  }
}
