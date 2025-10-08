import { findOneExercise } from '@/modules/training/api/exercise.api'

interface ExercisePageProps {
  params: { slug: string }
}

export default async function ExercisePage ({ params }: ExercisePageProps) {
  try {
    const exercise = await findOneExercise(params.slug)

    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">{exercise.name}</h1>
        <p className="text-gray-600 mb-4">{exercise.description}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Músculo objetivo:</strong> {exercise.target}
          </div>
          <div>
            <strong>Parte del cuerpo:</strong> {exercise.bodyPart}
          </div>
          <div>
            <strong>Equipamiento:</strong> {exercise.equipment}
          </div>
          <div>
            <strong>Dificultad:</strong> {exercise.difficulty}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Ejercicio no encontrado</h1>
        <p>No se pudo cargar la información del ejercicio.</p>
      </div>
    )
  }
}
