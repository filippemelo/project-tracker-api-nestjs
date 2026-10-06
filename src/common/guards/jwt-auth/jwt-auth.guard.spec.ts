import { RequestContextService } from '../../services/request-context/request-context.service.js'
import { JwtAuthGuard } from './jwt-auth.guard.js'

describe('JwtAuthGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard(new RequestContextService())).toBeDefined()
  })
})
