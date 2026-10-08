import { Reflector } from '@nestjs/core'
import { PrismaService } from '../../prisma.service.js'
import { ValidateResoursesIdsInterceptor } from './validate-resourses-ids.interceptor.js'

describe('ValidateResoursesIdsInterceptor', () => {
  it('should be defined', () => {
    expect(new ValidateResoursesIdsInterceptor(new Reflector(), new PrismaService())).toBeDefined()
  })
})
