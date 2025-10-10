import { Filters } from '@/modules/training'
import GridExercisesAsync from '@/modules/training/components/exercises/gridExercises/GridExercisesAsync'

export default function ExercisePage () {
  console.log('dentroo')
  return (
    <section className='px-4 py-8 flex flex-col gap-8'>
      <Filters />
      <GridExercisesAsync />
    </section>
  )
}
