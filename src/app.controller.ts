import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service.js'

@Controller({
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealthCheck(): { message: string } {
    return this.appService.getHealthCheck()
  }
}
