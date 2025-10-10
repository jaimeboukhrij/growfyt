import { findAllExercise, findOneExercise } from '@/modules/training/api/exercise.api'
import { BackButton } from '@/modules/training/components/exerciseDetail/backButton/BackButton'
import { Header } from '@/modules/training/components/exerciseDetail/header/Header'
import { Info } from '@/modules/training/components/exerciseDetail/info/Info'
import { MuscleGroups } from '@/modules/training/components/exerciseDetail/muscleGroups/MuscleGroups'
import { QuickActions } from '@/modules/training/components/exerciseDetail/quickActions/QuickActions'

export const revalidate = 604800 // 1 week
interface ExercisePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams () {
  const exercises = await findAllExercise()

  return exercises.map(prod => ({ slug: prod.slug }))
}

export default async function ExercisePage ({ params }: ExercisePageProps) {
  const { slug } = await params
  const exercise = await findOneExercise(slug)

  if (!exercise) {
    return (
      <p>no hay ejercicios que mostart</p>
    )
  }

  return (
    <main className="flex-1 p-6  flex flex-col gap-4">
      <BackButton />
      <section className="grid gap-6 lg:grid-cols-3">
        <Header exercise={exercise} />

        <section className="space-y-6">
          <MuscleGroups exercise={exercise} />
          <QuickActions />
          <Info {...exercise} />

        </section>
      </section>
    </main>
  )
}
