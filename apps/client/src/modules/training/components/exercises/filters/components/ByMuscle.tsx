'use client'

import { BodyPart } from 'growfit-shared'
import { Filter } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { AddExercise } from './AddExercise'

export const ByMuscle = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bodyPart = searchParams.get('bodyPart') ?? 'all'

  const handleBodyPartChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all') {
      params.delete('bodyPart')
    } else {
      params.set('bodyPart', value)
    }
    console.log('dentrroo', { params })
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <section className='flex gap-4 items-center'>
      <Select value={bodyPart} onValueChange={handleBodyPartChange}>
        <SelectTrigger className="w-[180px] cursor-pointer">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Parte del cuerpo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem className='cursor-pointer' value="all">Todas</SelectItem>
          {Object.entries(BodyPart).map(([key, value]) => (
            <SelectItem key={key} value={key} className='cursor-pointer'>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <AddExercise className='flex lg:hidden' />
    </section>
  )
}
