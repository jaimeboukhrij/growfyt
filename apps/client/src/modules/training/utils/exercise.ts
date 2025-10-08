import { ExerciseDifficultyValues } from 'growfit-shared'

import { DifficultyColors } from '@/core/models/difficultyColors.enum'

export const getExerciseUrlImg = (playbackId: string) => `https://customer-lvz4yc6kzb02xkz5.cloudflarestream.com/${playbackId}/thumbnails/thumbnail.jpg`

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case ExerciseDifficultyValues.BEGINNER:
      return DifficultyColors.BEGINNER
    case ExerciseDifficultyValues.INTERMEDIATE:
      return DifficultyColors.INTERMEDIATE
    case ExerciseDifficultyValues.ADVANCED:
      return DifficultyColors.ADVANCED
    default:
      return DifficultyColors.BEGINNER
  }
}

export const formatBodyPart = (bodyPart: string): string => {
  return bodyPart.toLowerCase().replace(/([A-Z])/g, ' $1').trim()
}
