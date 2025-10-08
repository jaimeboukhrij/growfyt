import { Controller, Get, Query, Param } from '@nestjs/common'
import { ApiResponse, Exercise, ExercisesQueryParams } from 'growfit-shared'

import { ExerciseService } from './services/exercises.service'

@Controller('training')
export class TrainingController {
  constructor (private readonly exerciseService: ExerciseService) {}

  @Get('exercises')
  async findAllExercises (@Query() queryParams: ExercisesQueryParams): Promise<ApiResponse<Exercise[]>> {
    return await this.exerciseService.findAll(queryParams)
  }

  @Get('exercises/:id')
  async findOneExercise (@Param('id') id: string): Promise<ApiResponse<Exercise>> {
    return await this.exerciseService.findOne(id)
  }
}
