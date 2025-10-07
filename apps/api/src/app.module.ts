import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

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
    TrainingModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
