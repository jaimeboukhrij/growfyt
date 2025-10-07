import { Injectable } from '@nestjs/common'
import { Exercise, ApiResponse } from 'growfit-shared'

import { PrismaService } from 'src/prisma/prisma.service'

import { mapBodyPart, mapCategory, mapDifficulty, mapEquipment, mapTargetMuscle } from '../mappers/exercises.mapper'

@Injectable()
export class ExerciseService {
  constructor (
    private readonly prismaService: PrismaService
  ) {}

  async findAll (): Promise<ApiResponse<Exercise[]>> {
    try {
      const exercises = await this.prismaService.exercise.findMany({})
      console.log('Exercises from DB:', exercises[0])

      const data: Exercise[] = exercises.map(exercise => ({
        ...exercise,
        bodyPart: mapBodyPart(exercise.bodyPart),
        equipment: mapEquipment(exercise.equipment),
        target: mapTargetMuscle(exercise.target),
        difficulty: mapDifficulty(exercise.difficulty),
        category: mapCategory(exercise.category)
      }))

      console.log('Processed data:', data[0])
      return {
        code: 200,
        success: true,
        data
      }
    } catch (error) {
      console.log(error)
      return {
        code: 500,
        success: false,
        error: 'Internal Server Error'
      }
    }
  }
}
