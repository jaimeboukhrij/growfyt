import { Injectable } from '@nestjs/common'
import { BodyPart, Prisma } from '@prisma/client'
import { Exercise, ApiResponse, ExercisesQueryParams } from 'growfit-shared'

import { PrismaService } from '../../prisma/prisma.service'
import { mapBodyPart, mapCategory, mapDifficulty, mapEquipment, mapTargetMuscle } from '../mappers/exercises.mapper'

@Injectable()
export class ExerciseService {
  constructor (
    private readonly prismaService: PrismaService
  ) {}

  async findAll (queryParams: ExercisesQueryParams = {}): Promise<ApiResponse<Exercise[]>> {
    console.log('debtrooooo del back')
    const { q, bodyPart } = queryParams
    try {
      const whereClause: Prisma.ExerciseWhereInput = {}

      if (bodyPart) {
        whereClause.bodyPart = bodyPart as unknown as BodyPart
      }

      if (q) {
        whereClause.OR = [
          { name: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } }
        ]
      }

      const exercises = await this.prismaService.exercise.findMany({
        where: whereClause
      })

      const data: Exercise[] = exercises.map(exercise => ({
        ...exercise,
        bodyPart: mapBodyPart(exercise.bodyPart),
        equipment: mapEquipment(exercise.equipment),
        target: mapTargetMuscle(exercise.target),
        difficulty: mapDifficulty(exercise.difficulty),
        category: mapCategory(exercise.category)
      }))

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

  async findOne (id: string): Promise<ApiResponse<Exercise>> {
    try {
      const exercise = await this.prismaService.exercise.findUnique({
        where: { id }
      })

      if (!exercise) {
        return {
          code: 404,
          success: false,
          error: 'Exercise not found'
        }
      }

      const data: Exercise = {
        ...exercise,
        bodyPart: mapBodyPart(exercise.bodyPart),
        equipment: mapEquipment(exercise.equipment),
        target: mapTargetMuscle(exercise.target),
        difficulty: mapDifficulty(exercise.difficulty),
        category: mapCategory(exercise.category)
      }

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
