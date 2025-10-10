import { type Exercise as ExerciseType } from 'growfit-shared'

import { Exercise } from '../exercise/Exercise'

interface Props {
  exercises: ExerciseType[] | undefined
}

export const GridExercises = ({ exercises }: Props) => {
  if (!exercises) {
    return (
      <h3>No hay ejercicios que mostar</h3>
    )
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full overflow-hidden">
      {exercises.map((exercise) => (
        <Exercise key={exercise.id} exercise={exercise} />
      ))}
    </div>
  )
}
