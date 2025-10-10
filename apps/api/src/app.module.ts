import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { CloudFlareModule } from './cloudflare/cloudflare.module'
import { PrismaModule } from './prisma/prisma.module'
import { TrainingModule } from './training/training.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    UsersModule,
    TrainingModule,
    CloudFlareModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
