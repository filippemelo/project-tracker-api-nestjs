import { Injectable } from '@nestjs/common'
import { CollaboratorRole, Project } from '@prisma/client'
import { QueryPaginationDTO } from '../../common/dtos/query-pagination.dto.js'
import { RequestContextService } from '../../common/services/request-context/request-context.service.js'
import { PrismaService } from '../../prisma.service.js'
import { paginate, paginateOutput } from '../../utils/pagination.utils.js'
import { ProjectRequestDTO } from './projects.dto.js'

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly requestContext: RequestContextService,
  ) {}

  async findAll(query?: QueryPaginationDTO) {
    const userId = this.requestContext.getUserId()

    const projects = await this.prisma.project.findMany({
      ...paginate(query),
      where: {
        createdById: userId,
      },
    })

    const total = await this.prisma.project.count({
      where: {
        OR: [
          { createdById: userId },
          {
            collaborators: {
              some: { userId },
            },
          },
        ],
      },
    })

    return paginateOutput<Project>(projects, total, query)
  }

  findById(id: string) {
    const userId = this.requestContext.getUserId()

    return this.prisma.project.findFirst({
      where: { id: id, createdById: userId },
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

  async create(data: ProjectRequestDTO) {
    const userId = this.requestContext.getUserId()

    const project = this.prisma.project.create({
      data: {
        ...data,
        createdById: userId,
      },
    })

    // add the user as owner to the created project
    await this.prisma.projectCollaborator.create({
      data: {
        projectId: (await project).id,
        userId: userId,
        role: CollaboratorRole.OWNER,
      },
    })

    return project
  }

  update(id: string, data: ProjectRequestDTO) {
    const userId = this.requestContext.getUserId()

    return this.prisma.project.update({
      where: {
        id: id,
        createdById: userId,
      },
      data: data,
    })
  }

  async remove(id: string) {
    const userId = this.requestContext.getUserId()

    await this.prisma.task.deleteMany({ where: { projectId: id } })

    return await this.prisma.project.delete({
      where: { id, createdById: userId },
    })
  }
}
