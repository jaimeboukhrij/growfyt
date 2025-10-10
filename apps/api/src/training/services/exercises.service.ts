import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { BodyPart as PrismaBodyPart, Prisma, Exercise as PrismaExercise } from '@prisma/client'
import { Exercise, ApiResponse, ExercisesQueryParams } from 'growfit-shared'

import { PrismaService } from '../../prisma/prisma.service'
import { errorResponse, successResponse } from '../../utils/apiResponse'
import { mapBodyPart, mapCategory, mapDifficulty, mapEquipment, mapTargetMuscle } from '../mappers/exercises.mapper'

import { ExerciseMuscleImage } from './exercise-muscle-image.service'

@Injectable()
export class ExerciseService {
  constructor (
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => ExerciseMuscleImage))
    private readonly exerciseMuscleImage: ExerciseMuscleImage
  ) {}

  async findAll (queryParams: ExercisesQueryParams = {}): Promise<ApiResponse<Exercise[]>> {
    const { q, bodyPart, limit, offset } = queryParams
    console.log({ queryParams })
    try {
      const whereClause: Prisma.ExerciseWhereInput = {}

      if (bodyPart) {
        whereClause.bodyPart = bodyPart as unknown as PrismaBodyPart
      }

      if (q) {
        whereClause.OR = [
          { name: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } }
        ]
      }

      const prismaOptions: Prisma.ExerciseFindManyArgs = {
        where: whereClause
      }

      if (limit !== undefined && !isNaN(Number(limit))) {
        prismaOptions.take = Number(limit)
      }
      if (offset !== undefined && !isNaN(Number(offset))) {
        prismaOptions.skip = Number(offset)
      }

      const exercises = await this.prismaService.exercise.findMany(prismaOptions)
      const data: Exercise[] = exercises.map(exercise => this.buildExerciseToClient(exercise))

      return successResponse(data)
    } catch (error) {
      console.log(error)
      return errorResponse(error)
    }
  }

  async findOne (slug: string): Promise<ApiResponse<Exercise>> {
    try {
      const exercise = await this.prismaService.exercise.findUnique({
        where: { slug }
      })

      if (!exercise) {
        return errorResponse('Exercise not found', 404)
      }
      const muscleImageUrl = await this.exerciseMuscleImage.getColoredMuscleImage(exercise.primaryMuscle, exercise.secondaryMuscles, exercise.slug)

      const data = this.buildExerciseToClient(exercise, muscleImageUrl)
      console.log(data)

      return successResponse(data)
    } catch (error) {
      console.log(error)
      return errorResponse(error)
    }
  }

  private buildExerciseToClient (exercise: PrismaExercise, muscleImageUrl: string = ''): Exercise {
    return ({
      ...exercise,
      videoUrl: this.getVideUrl(exercise.playbackId),
      imageUrl: this.getImgUrl(exercise.playbackId),
      bodyPart: mapBodyPart(exercise.bodyPart),
      equipment: mapEquipment(exercise.equipment),
      primaryMuscle: mapTargetMuscle(exercise.primaryMuscle),
      secondaryMuscles: exercise.secondaryMuscles.map(m => mapTargetMuscle(m)),
      difficulty: mapDifficulty(exercise.difficulty),
      category: mapCategory(exercise.category),
      muscleImageUrl
    })
  }

  private readonly getVideUrl = (playBackId: string) => {
    return `https://customer-lvz4yc6kzb02xkz5.cloudflarestream.com/${playBackId}/watch`
  }

  private readonly getImgUrl = (playBackId: string) => {
    return `https://customer-lvz4yc6kzb02xkz5.cloudflarestream.com/${playBackId}/thumbnails/thumbnail.jpg`
  }
}
