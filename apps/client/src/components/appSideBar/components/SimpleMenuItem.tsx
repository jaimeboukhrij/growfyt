import Link from 'next/link'

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

import { type MenuItem } from '../models/menuItem.interface'

interface Props {
  item: MenuItem
  pathname: string
  mounted: boolean
}

export function SimpleMenuItem ({ item, pathname, mounted }: Props) {
  const isActive = mounted && pathname === item.href
  return (
    <SidebarMenuItem className='cursor-pointer'>
      <SidebarMenuButton
        asChild
        isActive={false}
        tooltip={item.title}
        className={`font-medium ${
          isActive
            ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-500 hover:!bg-emerald-50 hover:!text-emerald-700 [&[data-state="open"]]:hover:!bg-emerald-50'
            : ''
        }`}
      >
        <Link href={item.href ?? '#'}>
          <item.icon className={`h-4 w-4 ${isActive ? '!text-emerald-700' : ''}`} />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
