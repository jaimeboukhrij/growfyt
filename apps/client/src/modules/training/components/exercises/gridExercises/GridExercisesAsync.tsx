'use client'

import { type BodyParts, type Exercise } from 'growfit-shared'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import { findAllExercise } from '@/modules/training'

import { GridExercises } from './GridExercises'
import { GridExercisesSkeleton } from './GridExercisesSkeleton'

export default function GridExercisesAsync () {
  const searchParams = useSearchParams()
  const searchString = searchParams.toString()
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showSkeleton, setShowSkeleton] = useState(false)

  const requestParams = useMemo(() => {
    const params = new URLSearchParams(searchString)
    const q = params.get('q') ?? undefined
    const bodyPart = params.get('bodyPart') as BodyParts ?? undefined
    setShowSkeleton(!q && !bodyPart)

    return { q, bodyPart }
  }, [searchString, setShowSkeleton])

  useEffect(() => {
    const fetchExercises = async () => {
      setIsLoading(true)
      try {
        const data = await findAllExercise(requestParams)
        setExercises(data)
      } catch (err) {
        console.error('Error loading exercises:', err)
      } finally {
        setIsLoading(false)
      }
    }

    void fetchExercises()
  }, [requestParams])

  if (showSkeleton && isLoading) {
    return <GridExercisesSkeleton />
  }

  return <GridExercises exercises={exercises} />
}
