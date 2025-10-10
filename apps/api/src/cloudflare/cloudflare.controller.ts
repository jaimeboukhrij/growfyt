// src/image/image.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { CloudFlareService } from './cloudflare.service'

@Controller('images')
export class CloudFlareController {
  constructor (private readonly cloudFlare: CloudFlareService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage (
  @UploadedFile() file: Express.Multer.File,
    @Body('id') id: string
  ) {
    return await this.cloudFlare.uploadImage(file, id)
  }
}
