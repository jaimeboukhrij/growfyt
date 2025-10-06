import { Dumbbell } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { SidebarHeader } from '@/components/ui/sidebar'

export const Header = () => {
  return (
    <SidebarHeader className="border-b border-sidebar-border px-6 py-4">
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Dumbbell className="h-5 w-5" />
        </div>
        <span className="text-lg font-semibold">CoachPro</span>
      </Link>
    </SidebarHeader>
  )
}
