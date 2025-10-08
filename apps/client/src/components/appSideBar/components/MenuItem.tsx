'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

import type { MenuItem as MenuItemType } from '../models/menuItem.interface'

import { CollapsibleMenuItem } from './CollapsibleMenuItem'
import { SimpleMenuItem } from './SimpleMenuItem'

interface Props {
  item: MenuItemType
}

export function MenuItem ({ item }: Props) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!item.subItems) {
    return <SimpleMenuItem item={item} pathname={pathname} mounted={mounted} />
  }

  return <CollapsibleMenuItem item={item} pathname={pathname} mounted={mounted} />
}
