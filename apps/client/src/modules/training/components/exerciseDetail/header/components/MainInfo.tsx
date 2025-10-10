import { type Difficulty, type Equipment } from 'growfit-shared'
import { Share2, Heart } from 'lucide-react'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getDifficultyColor } from '@/modules/training/utils'

interface Props {
  difficulty: Difficulty
  equipment: Equipment
  name: string
  description: string

}

export const MainInfo = ({ ...props }: Props) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Badge className={getDifficultyColor(props.difficulty)}>
            {props.difficulty}
          </Badge>
          <span className="text-sm text-muted-foreground">{props.equipment}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-2 first-letter:capitalize">{props.name}</h2>
      <p className="text-muted-foreground leading-relaxed">{props.description}</p>
    </>
  )
}
