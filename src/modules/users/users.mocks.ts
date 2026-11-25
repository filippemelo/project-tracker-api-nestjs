import { faker } from '@faker-js/faker'
import { User } from '@prisma-generate/client.js'
import { QueryPaginationDTO } from '../../common/dtos/query-pagination.dto.js'

export const mockPaginationQuery: QueryPaginationDTO = {
  page: '1',
  size: '10',
}

export const mockedUsers = faker.helpers.multiple<User>(() => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  avatar: null,
  role: 'USER',
  createdAt: new Date(),
  updatedAt: new Date(),
  createdProjects: [
    { id: 'proj-1', name: faker.lorem.sentence(), description: faker.lorem.sentence() },
  ],
  password: 'hashed',
}))
