import { Module } from '@nestjs/common'

import { CloudFlareController } from './cloudflare.controller'
import { CloudFlareService } from './cloudflare.service'

@Module({
  controllers: [CloudFlareController],
  providers: [CloudFlareService],
  exports: [CloudFlareService]
})
export class CloudFlareModule {}
