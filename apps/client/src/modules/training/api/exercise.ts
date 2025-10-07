import { type ApiResponse, type Exercise } from 'growfit-shared'

import { fetcher } from '@/core/api'

export const findAllExercise = async (): Promise<Exercise[]> => {
  const response = await fetcher<ApiResponse<Exercise[]>>('/training/exercises')

  if (!response.success) {
    throw new Error(response.error)
  }

  return response.data
}
