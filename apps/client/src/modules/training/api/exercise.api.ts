import { type ExercisesQueryParams, type ApiResponse, type Exercise } from 'growfit-shared'

import { fetcher } from '@/core/api'
import { buildQueryParams } from '@/core/utils/buildQuery'

export const findAllExercise = async (query?: ExercisesQueryParams): Promise<Exercise[]> => {
  const searchParams = buildQueryParams<ExercisesQueryParams>(query)
  const response = await fetcher<ApiResponse<Exercise[]>>(`/training/exercises?${searchParams}`, {
    revalidate: 300
  })

  if (!response.success) {
    throw new Error(response.error)
  }

  return response.data
}

export const findOneExercise = async (id: string): Promise<Exercise> => {
  const response = await fetcher<ApiResponse<Exercise>>(`/training/exercises/${id}`)

  if (!response.success) {
    throw new Error(response.error)
  }

  return response.data
}
