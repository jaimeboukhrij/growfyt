import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { ChevronRight } from 'lucide-react'
import React from 'react'

import { SidebarFooter } from '@/components/ui/sidebar'

export const Footer = () => {
  return (
    <SidebarFooter className="border-t border-sidebar-border p-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/motivational-coach.png" />
          <AvatarFallback>CP</AvatarFallback>
        </Avatar>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-medium">Carlos Pérez</p>
          <p className="text-xs text-muted-foreground truncate">coach@coachpro.com</p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </SidebarFooter>
  )
}
