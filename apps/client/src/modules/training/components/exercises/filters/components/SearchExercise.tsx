'use client'

import { Search, X } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const SearchExercise = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleClear = () => {
    setQuery('')
  }

  useEffect(() => {
    const updateURL = (value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value.trim()) {
        params.set('q', value)
      } else {
        params.delete('q')
      }
      router.push(`?${params.toString()}`, { scroll: false })
    }

    const timeoutId = setTimeout(() => {
      updateURL(query)
    }, 250)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [query, searchParams, router])

  return (
    <div className="relative flex-1 max-w-lg">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={query}
        onChange={handleSearchChange}
        placeholder="Buscar ejercicios..."
        className="pl-9 pr-9"
      />
      {query && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="absolute right-1 cursor-pointer top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
