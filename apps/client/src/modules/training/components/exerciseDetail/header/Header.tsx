import { type Exercise } from 'growfit-shared'
import React from 'react'

import { Card, CardContent } from '@/components/ui/card'

import { ExerciseVideo } from './components/ExerciseVideo'
import { Instructions } from './components/Instructions'
import { MainInfo } from './components/MainInfo'

interface Props {
  exercise: Exercise
}

export const Header = ({ exercise }: Props) => {
  return (
    <header className="lg:col-span-2 space-y-6">
      <Card className="overflow-hidden">
        <ExerciseVideo imageUrl={exercise.imageUrl} slug={exercise.slug} playbackId={exercise.playbackId} />
        <CardContent className="p-6">
          <MainInfo {...exercise} />
        </CardContent>
      </Card>
      <Instructions instructions={exercise.instructions} />

    </header>
  )
}
