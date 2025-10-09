'use client'

import { Settings } from 'lucide-react'

import { SidebarMenuItem, SidebarMenuButton, SidebarContent } from '@/components/ui/sidebar'

import { menuItems } from '../const/menuItems.const'

import { Group } from './Group'
import { MenuItem } from './MenuItem'

export const Content = () => {
  return (
    <SidebarContent>
      <Group title='Menu principal'>
        {menuItems.map((item) => (
          <MenuItem key={item.href ?? item.title} item={item} />
        ))}
      </Group>
      <Group title='Ajustes'>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Ajustes">
            <button>
              <Settings className="h-4 w-4" />
              <span>Ajustes</span>
            </button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </Group>
    </SidebarContent>
  )
}
