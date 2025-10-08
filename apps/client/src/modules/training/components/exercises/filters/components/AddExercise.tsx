import { Plus } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
interface Props {
  className: string
}

export const AddExercise = ({ className }: Props) => {
  return (
    <Button className={className}>
      <Plus className="mr-2 h-4 w-4" />
      Añadir Ejercicio
    </Button>
  )
}
