import { INestApplication, VersioningType } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import type { App } from 'supertest/types.js'
import { AppModule } from './../src/app.module.js'

describe('AppController (e2e)', () => {
  let app: INestApplication<App>

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.enableVersioning({ type: VersioningType.URI })
    await app.init()
  })

  it('/v1 (GET)', () => {
    return request(app.getHttpServer()).get('/v1').expect(200).expect({ message: 'API is running' })
  })

  afterEach(async () => {
    await app.close()
  })
})
