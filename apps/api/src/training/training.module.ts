import { Module } from '@nestjs/common'

import { PrismaModule } from '../prisma/prisma.module'

import { CloudFlareModule } from './../cloudflare/cloudflare.module'
import { ExerciseMuscleImage } from './services/exercise-muscle-image.service'
import { ExerciseService } from './services/exercises.service'
import { TrainingController } from './training.controller'

@Module({
  imports: [PrismaModule, CloudFlareModule],
  controllers: [TrainingController],
  providers: [ExerciseService, ExerciseMuscleImage],
  exports: [ExerciseService]
})
export class TrainingModule {}
