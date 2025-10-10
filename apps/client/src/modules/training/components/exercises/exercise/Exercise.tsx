import { type Exercise as ExerciseEnum } from 'growfit-shared'
import Link from 'next/link'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { formatBodyPart, getDifficultyColor, getExerciseUrlImg } from '@/modules/training/utils'

interface Props {
  exercise: ExerciseEnum
}

export const Exercise = ({ exercise }: Props) => {
  return (
    <Link
      key={exercise.id}
      href={`/training/exercises/${exercise.id}`} className=" min-w-0"
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full w-full hover:scale-102">
        <div
          className="aspect-video bg-muted relative overflow-hidden"
          style={{
            backgroundImage: `url(${getExerciseUrlImg(exercise.playbackId)})`,
            backgroundSize: 'cover',
            backgroundPosition: '1px',
            backgroundRepeat: 'no-repeat'
          }}
          role="img"
          aria-label={exercise.name}
        />
        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold truncate first-letter:uppercase" title={exercise.name}>{exercise.name}</h3>
            <p className="text-sm text-muted-foreground first-letter:uppercase">{formatBodyPart(exercise.bodyPart)}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground first-letter:uppercase">{exercise.equipment}</span>
            <Badge className={`${getDifficultyColor(exercise.difficulty)} pointer-events-none`}>
              {exercise.difficulty}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
