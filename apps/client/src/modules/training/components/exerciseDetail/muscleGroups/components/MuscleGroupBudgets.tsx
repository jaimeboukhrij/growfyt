import { type Muscle } from 'growfit-shared'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface Props {
  primaryMuscle: Muscle
  secondaryMuscles: Muscle[]
}

export const MuscleGroupBudgets = ({ primaryMuscle, secondaryMuscles }: Props) => {
  return (
    <section className="space-y-3">
      <div>
        <h4 className="text-sm font-semibold mb-2">Músculo Primario</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">
            {primaryMuscle}
          </Badge>
        </div>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-semibold mb-2">Músculos Secundarios</h4>
        <div className="flex flex-wrap gap-2">
          {secondaryMuscles.map((muscle) => (
            <Badge key={muscle} variant='secondary'>
              {muscle}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
