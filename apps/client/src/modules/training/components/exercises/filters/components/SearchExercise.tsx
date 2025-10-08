'use client'

import { Search } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

import { Input } from '@/components/ui/input'

export const SearchExercise = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const urlQuery = searchParams.get('q') ?? ''
    setQuery(urlQuery)
  }, [searchParams])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      if (query.trim()) {
        params.set('q', query)
      } else {
        params.delete('q')
      }

      router.push(`?${params.toString()}`, { scroll: false })
    }, 300)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [query, searchParams, router])

  const handleSearchChange = (value: string) => {
    setQuery(value)
  }

  return (
    <div className="relative flex-1 max-w-lg">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={query}
        onChange={(e) => {
          handleSearchChange(e.target.value)
        }}
        placeholder="Buscar ejercicios..."
        className="pl-9"
      />
    </div>
  )
}
