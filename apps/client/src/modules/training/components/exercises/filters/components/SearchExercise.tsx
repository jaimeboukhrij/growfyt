'use client'

import { Search } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useState, useEffect, useCallback } from 'react'

import { Input } from '@/components/ui/input'

export const SearchExercise = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')

  const updateURL = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value.trim()) {
      params.set('q', value)
    } else {
      params.delete('q')
    }

    router.push(`?${params.toString()}`, { scroll: false })
  }, [searchParams, router])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateURL(query)
    }, 300)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [query, updateURL])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <div className="relative flex-1 max-w-lg">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={query}
        onChange={handleSearchChange}
        placeholder="Buscar ejercicios..."
        className="pl-9"
      />
    </div>
  )
}
