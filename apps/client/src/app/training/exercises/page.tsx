import { Filters, findAllExercise } from '@/modules/training'
import { GridExercises } from '@/modules/training/components/exercises/gridExercises/GridExercises'

export default async function ExercisePage () {
  const exercise = await findAllExercise()

  return (
    <section className='px-4 py-8 flex flex-col gap-8'>
      <Filters />
      <GridExercises exercises={exercise} />
    </section>
  )
}
