import { LayoutDashboard, Dumbbell, Library } from 'lucide-react'

import { type MenuItem } from '../models/menuItem.interface'

export const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/'
  },

  {
    title: 'Entrenamientos',
    icon: Dumbbell,
    subItems: [
      {
        title: 'Todas los ejercicios',
        icon: Library,
        href: '/training/exercises'
      }

    ]
  }

]
