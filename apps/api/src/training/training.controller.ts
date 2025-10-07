import { Controller, Get } from '@nestjs/common'
import { ApiResponse, Exercise } from 'growfit-shared'

import { ExerciseService } from './services/exercises.service'

@Controller('training')
export class TrainingController {
  constructor (private readonly exerciseService: ExerciseService) {}

  @Get('exercises')
  async findAllExercises (): Promise<ApiResponse<Exercise[]>> {
    return await this.exerciseService.findAll()
  }
}
