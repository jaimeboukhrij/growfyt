import { AddExercise } from './components/AddExercise'
import { ByMuscle } from './components/ByMuscle'
import { SearchExercise } from './components/SearchExercise'

export const Filters = () => {
  return (
    <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <section className="flex flex-col gap-6 lg:flex-row flex-1 lg:gap-2">
        <SearchExercise />
        <ByMuscle />
      </section>
      <AddExercise className='hidden lg:flex' />
    </section>
  )
}
