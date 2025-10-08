import { type TargetMuscles } from 'growfit-shared'

import { Filters, findAllExercise } from '@/modules/training'
import { GridExercises } from '@/modules/training/components/exercises/gridExercises/GridExercises'
interface Props {
  searchParams: Promise<{ muscle: TargetMuscles, q: string }>
}

export default async function ExercisePage ({ searchParams }: Props) {
  const { muscle, q } = await searchParams
  const exercise = await findAllExercise({ q, targetMuscle: muscle })

  return (
    <section className='px-4 py-8 flex flex-col gap-8'>
      <Filters />
      <GridExercises exercises={exercise} />
    </section>
  )
}
