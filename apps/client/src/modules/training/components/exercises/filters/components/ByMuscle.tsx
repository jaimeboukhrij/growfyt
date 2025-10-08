import { BodyParts } from 'growfit-shared'
import { Filter } from 'lucide-react'
import React from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { AddExercise } from './AddExercise'

export const ByMuscle = () => {
  return (
    <section className='flex gap-4 items-center'>
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Parte del cuerpo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {Object.entries(BodyParts).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <AddExercise className='flex lg:hidden' />
    </section>
  )
}
