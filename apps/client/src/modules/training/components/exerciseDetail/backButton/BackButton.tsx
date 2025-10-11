'use client'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export const BackButton = () => {
  const router = useRouter()
  return (
    <section className='w-full flex justify-start'>

      <Button variant="ghost" className='cursor-pointer' size="sm" onClick={() => { router.back() }}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Volver a Ejercicios
      </Button>
    </section>
  )
}
