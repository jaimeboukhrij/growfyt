import { type ExercisesQueryParams, type ApiResponse, type Exercise } from 'growfit-shared'

import { fetcher } from '@/core/api'
import { buildQueryParams } from '@/core/utils/buildQuery'

export const findAllExercise = async (query?: ExercisesQueryParams): Promise<Exercise[]> => {
  const searchParams = buildQueryParams<ExercisesQueryParams>(query)
  const response = await fetcher<ApiResponse<Exercise[]>>(`/training/exercises?${searchParams}`, {
    revalidate: 300,
    cache: 'force-cache'
  })

  if (!response.success) {
    throw new Error(response.error)
  }

  return response.data
}

export const findOneExercise = async (slug: string): Promise<Exercise | undefined> => {
  try {
    const response = await fetcher<ApiResponse<Exercise>>(`/training/exercises/${slug}`)

    if (!response.success) {
      throw new Error(response.error)
    }

    return response.data
  } catch (error) {
    console.log(error)
    return undefined
  }
}
