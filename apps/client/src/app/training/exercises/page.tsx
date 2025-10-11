import { Filters } from '@/modules/training'
import GridExercisesAsync from '@/modules/training/components/exercises/gridExercises/GridExercisesAsync'

export default function ExercisePage () {
  return (
    <section className='px-4 py-8 flex flex-col gap-8'>
      <Filters />
      <GridExercisesAsync />
    </section>
  )
}
