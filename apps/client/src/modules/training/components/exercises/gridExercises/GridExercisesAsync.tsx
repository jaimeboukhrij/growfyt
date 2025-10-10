'use client'

import { useExercises } from '@/modules/training/hooks/useExercises'
import { useInfinityExercisesScroll } from '@/modules/training/hooks/useInfinityExercisesScroll'

import { GridExercises } from './GridExercises'
import { GridExercisesLoader } from './GridExercisesLoader'
import { GridExercisesSkeleton } from './GridExercisesSkeleton'

export default function GridExercisesAsync () {
  const { exercises, showLoader, isFirstLoad, hasMore, loadingMore, loadMore } = useExercises(20)
  const { loaderRef } = useInfinityExercisesScroll({ loadingMore, loadMore, hasMore })

  if (isFirstLoad) {
    return <GridExercisesSkeleton />
  }

  return (
    <section className="relative">
      {showLoader && (<GridExercisesLoader />)}
      <GridExercises exercises={exercises} />
      {hasMore &&
      (
        <div ref={loaderRef} className="flex justify-center py-4">
          {loadingMore && (
            <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          )}
        </div>
      )}
    </section>
  )
}
