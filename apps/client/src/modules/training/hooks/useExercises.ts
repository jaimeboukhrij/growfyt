'use client'

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { type BodyPart } from 'growfit-shared'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import { findAllExercise } from '@/modules/training'

export const useExercises = (initialLimit = 6) => {
  const searchParams = useSearchParams()
  const searchString = searchParams.toString()
  const queryClient = useQueryClient()

  const requestParams = useMemo(() => {
    const params = new URLSearchParams(searchString)
    const q = params.get('q') ?? undefined
    const bodyPart = params.get('bodyPart') as BodyPart ?? undefined

    return { q, bodyPart }
  }, [searchString])

  const queryKey = ['exercises', requestParams.q, requestParams.bodyPart]

  const isCached = queryClient.getQueryData(queryKey) !== undefined

  const {
    data,
    isLoading: isFirstLoad,
    isFetchingNextPage: loadingMore,
    hasNextPage: hasMore,
    fetchNextPage,
    error
  } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 0 }) => {
      const data = await findAllExercise({
        ...requestParams,
        limit: initialLimit,
        offset: pageParam
      })
      return data
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < initialLimit) {
        return undefined
      }
      return allPages.reduce((acc, page) => acc + page.length, 0)
    }
  })

  const exercises = data?.pages.flat() ?? []

  const loadMore = async () => {
    if (!hasMore || loadingMore) return
    await fetchNextPage()
  }

  return {
    exercises,
    showLoader: isFirstLoad,
    isFirstLoad,
    hasMore: hasMore ?? false,
    loadingMore,
    loadMore,
    error,
    isCached
  }
}
