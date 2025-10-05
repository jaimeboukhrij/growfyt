import { Controller, Get } from '@nestjs/common'
import { APP_NAME } from 'growfit-shared'

import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor (private readonly appService: AppService) {}

  @Get()
  getRoot () {
    return {
      success: true,
      data: {
        message: `Welcome to ${APP_NAME} API`,
        version: '1.0.0'
      }
    }
  }

  @Get('health')
  getHealth () {
    return {
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString()
      }
    }
  }
}
