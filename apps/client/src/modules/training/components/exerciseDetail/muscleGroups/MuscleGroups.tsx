import { type Exercise } from 'growfit-shared'
import Image from 'next/image'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

import { MuscleGroupBudgets } from './components/MuscleGroupBudgets'

interface Props {
  exercise: Exercise
}

export const MuscleGroups = ({ exercise }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Músculos Trabajados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative w-full h-64 bg-muted rounded-lg overflow-hidden">
          <Image
            fill
            src={exercise.muscleImageUrl || '/placeholder.svg'}
            alt="Diagrama muscular"
            className="object-contain"
          />
        </div>
        <MuscleGroupBudgets primaryMuscle={exercise.primaryMuscle} secondaryMuscles={exercise.secondaryMuscles} />
      </CardContent>
    </Card>
  )
}
