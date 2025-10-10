import { Separator } from '@radix-ui/react-separator'
import { type BodyPart, type Difficulty, type Equipment } from 'growfit-shared'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { getDifficultyColor } from '@/modules/training/utils'

interface Props {
  bodyPart: BodyPart
  equipment: Equipment
  difficulty: Difficulty
}

export const Info = ({ bodyPart, difficulty, equipment }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del Ejercicio</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Parte del Cuerpo</span>
          <span className="font-medium">{bodyPart}</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-muted-foreground">Equipamiento</span>
          <span className="font-medium">{equipment}</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-muted-foreground">Dificultad</span>
          <Badge className={getDifficultyColor(difficulty)}>
            {difficulty}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
