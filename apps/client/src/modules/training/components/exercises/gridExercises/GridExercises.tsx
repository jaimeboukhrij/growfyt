import { type Exercise } from 'growfit-shared'
import Link from 'next/link'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getDifficultyColor, getExerciseUrlImg, formatBodyPart } from '@/modules/training/utils'

interface Props {
  exercises: Exercise[] | undefined
}

export const GridExercises = ({ exercises }: Props) => {
  if (!exercises) {
    return (
      <h3>No hay ejercicios que mostar</h3>
    )
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {exercises.map((exercise) => (
        <Link key={exercise.id} href={`/exercises/${exercise.id}`}>
          <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full">
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
                <Badge className={getDifficultyColor(exercise.difficulty)}>
                  {exercise.difficulty}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
