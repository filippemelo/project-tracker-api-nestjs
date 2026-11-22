import { faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing'
import { Project } from '@prisma/client'
import { QueryPaginationDTO } from '../../common/dtos/query-pagination.dto.js'
import { RequestContextService } from '../../common/services/request-context/request-context.service.js'
import { PrismaService } from '../../prisma.service.js'
import { paginateOutput } from '../../utils/pagination.utils.js'
import { ProjectsService } from './projects.service.js'

describe('ProjectsService', () => {
  let service: ProjectsService
  let prisma: PrismaService

  const mockedProjects = faker.helpers.multiple<Project>(
    () => {
      return {
        id: faker.string.uuid(),
        name: faker.lorem.sentence(),
        description: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date(),
        createdById: 'user-1',
      }
    },
    { count: 10 },
  )

  const mockPaginationQuery: QueryPaginationDTO = {
    page: '1',
    size: '10',
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: PrismaService,
          useValue: {
            project: {
              findMany: jest.fn(),
              count: jest.fn(),
            },
          },
        },
        {
          provide: RequestContextService,
          useValue: {
            getUserId: jest.fn().mockReturnValue('user-1'),
          },
        },
      ],
    }).compile()

    service = module.get<ProjectsService>(ProjectsService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  it('should be able to return a paginated list of projects', async () => {
    jest.spyOn(prisma.project, 'findMany').mockResolvedValue(mockedProjects)
    jest.spyOn(prisma.project, 'count').mockResolvedValue(mockedProjects.length)

    const result = await service.findAll(mockPaginationQuery)

    expect(result).toEqual(
      paginateOutput<Project>(mockedProjects, mockedProjects.length, mockPaginationQuery),
    )
    expect(prisma.project.findMany).toHaveBeenCalledTimes(1)
  })
})
