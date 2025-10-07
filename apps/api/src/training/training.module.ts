import { Module } from '@nestjs/common'

import { PrismaModule } from 'src/prisma/prisma.module'

import { ExerciseService } from './services/exercises.service'
import { TrainingController } from './training.controller'

@Module({
  imports: [PrismaModule],
  controllers: [TrainingController],
  providers: [ExerciseService],
  exports: [ExerciseService]
})
export class TrainingModule {}
