import * as Collapsible from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import { SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from '@/components/ui/sidebar'

import { type MenuItem } from '../models/menuItem.interface'

interface Props {
  item: MenuItem
  pathname: string
  mounted: boolean
}

export function CollapsibleMenuItem ({ item, pathname, mounted }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  console.log({ item })

  const isSubmenuActive = item.subItems?.some(subItem =>
    subItem.href && mounted && pathname === subItem.href
  )

  useEffect(() => {
    if (mounted && isSubmenuActive) {
      setIsOpen(true)
    }
  }, [mounted, isSubmenuActive])

  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
      <SidebarMenuItem className='cursor-pointer'>
        <Collapsible.Trigger asChild className='cursor-pointer'>
          <SidebarMenuButton
            tooltip={item.title}
            isActive={false}
            className={`w-full font-medium ${
              mounted && isSubmenuActive
                ? 'bg-emerald-100 text-emerald-700 border-r-2 border-emerald-500 hover:!bg-emerald-100 hover:!text-emerald-700 [&[data-state="open"]]:hover:!bg-emerald-100'
                : ''
            }`}
          >
            <item.icon className={`h-4 w-4 ${mounted && isSubmenuActive ? '!text-emerald-700' : ''}`} />
            <span>{item.title}</span>
            <ChevronDown
              className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </SidebarMenuButton>
        </Collapsible.Trigger>

        <Collapsible.Content>
          <SidebarMenuSub
            className={`ml-1 pl-2 py-1 rounded-md ${
              mounted && isSubmenuActive ? 'bg-emerald-50/50 border-l-3 border-emerald-200 hover:bg-emerald-50/50 ' : 'hover:bg-emerald-50/50'
            }`}
          >
            {item.subItems?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.href ?? subItem.title} className='cursor-pointer'>
                <SidebarMenuSubButton
                  asChild
                  isActive={false}
                  className={`transition-all duration-200 font-normal text-sm ${
                    mounted && pathname === subItem.href
                      ? 'text-emerald-700 font-medium  hover:text-emerald-700 hover:!bg-transparent [&[data-state="open"]]:hover:!bg-transparent'
                      : 'text-gray-600'
                  }`}
                >
                  <Link href={subItem.href ?? '#'}>
                    <subItem.icon
                      className={`h-3.5 w-3.5 ${
                        mounted && pathname === subItem.href ? '!text-emerald-700' : 'text-gray-500'
                      }`}
                    />
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </Collapsible.Content>
      </SidebarMenuItem>
    </Collapsible.Root>
  )
}
