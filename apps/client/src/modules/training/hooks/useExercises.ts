import { type BodyPart, type Exercise } from 'growfit-shared'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState, useCallback } from 'react'

import { findAllExercise } from '@/modules/training'

export const useExercises = (initialLimit = 6) => {
  const searchParams = useSearchParams()
  const searchString = searchParams.toString()
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [showLoader, setShowLoader] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const requestParams = useMemo(() => {
    const params = new URLSearchParams(searchString)
    const q = params.get('q') ?? undefined
    const bodyPart = params.get('bodyPart') as BodyPart ?? undefined

    return { q, bodyPart }
  }, [searchString])

  // Fetch initial exercises
  useEffect(() => {
    const fetchExercises = async () => {
      setShowLoader(true)
      try {
        const data = await findAllExercise({ ...requestParams, limit: initialLimit, offset: 0 })
        setExercises(data)
        setOffset(data.length)
        setHasMore(data.length === initialLimit)
      } catch (err) {
        console.error('Error loading exercises:', err)
      } finally {
        setShowLoader(false)
        setIsFirstLoad(false)
      }
    }
    void fetchExercises()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString])

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore) return
    setLoadingMore(true)
    try {
      const data = await findAllExercise({ ...requestParams, limit: initialLimit, offset })
      setExercises(prev => [...prev, ...data])
      setOffset(prev => prev + data.length)
      setHasMore(data.length === initialLimit)
    } catch (err) {
      console.error('Error loading more exercises:', err)
    } finally {
      setLoadingMore(false)
    }
  }, [hasMore, loadingMore, requestParams, offset, initialLimit])

  return {
    exercises,
    showLoader,
    isFirstLoad,
    hasMore,
    loadingMore,
    loadMore
  }
}
