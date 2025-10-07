import { BodyParts } from 'growfit-shared'
import { Filter, Plus, Search } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export const Filters = () => {
  return (
    <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <section className="flex flex-1 gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar ejercicios..." className="pl-9" />
        </div>
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
      </section>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Añadir Ejercicio
      </Button>
    </section>
  )
}
