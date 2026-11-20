import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller.js'
import { AppService } from './app.service.js'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('HealthCheck', () => {
    it('should return "API is running!"', () => {
      expect(appController.getHealthCheck()).toEqual({
        message: 'API is running!',
      })
    })
  })
})
