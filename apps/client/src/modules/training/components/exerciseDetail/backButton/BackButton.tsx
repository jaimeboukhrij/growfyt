import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export const BackButton = () => {
  return (
    <Link href="/training/exercises">
      <Button variant="ghost" className='cursor-pointer' size="sm">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Volver a Ejercicios
      </Button>
    </Link>
  )
}
