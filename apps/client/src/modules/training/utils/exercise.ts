import { DifficultyColors } from '@/core/models/difficultyColors.enum'

export const getExerciseUrlImg = (playbackId: string) => `https://customer-lvz4yc6kzb02xkz5.cloudflarestream.com/${playbackId}/thumbnails/thumbnail.jpg`

export const getDifficultyColor = (difficulty: string): string => {
  const normalizedDifficulty = difficulty.toUpperCase() as keyof typeof DifficultyColors
  return DifficultyColors[normalizedDifficulty] || DifficultyColors.BEGINNER
}

export const formatBodyPart = (bodyPart: string): string => {
  return bodyPart.toLowerCase().replace(/([A-Z])/g, ' $1').trim()
}
