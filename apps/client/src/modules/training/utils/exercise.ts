import { Difficulty } from 'growfit-shared'

import { DifficultyColors } from '@/core/models/difficultyColors.enum'

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case Difficulty.BEGINNER:
      return DifficultyColors.BEGINNER
    case Difficulty.INTERMEDIATE:
      return DifficultyColors.INTERMEDIATE
    case Difficulty.ADVANCED:
      return DifficultyColors.ADVANCED
    default:
      return DifficultyColors.BEGINNER
  }
}

export const formatBodyPart = (bodyPart: string): string => {
  return bodyPart.toLowerCase().replace(/([A-Z])/g, ' $1').trim()
}
