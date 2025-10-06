import { LayoutDashboard, Users, Dumbbell, Library, TrendingUp, Award, UserPlus, Calendar, BookOpen, Target, BarChart3, Activity } from 'lucide-react'

import { type MenuItem } from '../models/menuItem.interface'

export const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/'
  },
  {
    title: 'Clientes',
    icon: Users,
    subItems: [
      {
        title: 'Todos los Clientes',
        icon: Users,
        href: '/clients'
      },
      {
        title: 'Nuevo Cliente',
        icon: UserPlus,
        href: '/clients/new'
      },
      {
        title: 'Ejercicios',
        icon: Activity,
        href: '/clients/exercise'
      }
    ]
  },
  {
    title: 'Rutinas',
    icon: Dumbbell,
    subItems: [
      {
        title: 'Todas las Rutinas',
        icon: Library,
        href: '/routines'
      },
      {
        title: 'Crear Rutina',
        icon: Calendar,
        href: '/routines/new'
      },
      {
        title: 'Plantillas',
        icon: BookOpen,
        href: '/routines/templates'
      }
    ]
  },
  {
    title: 'Ejercicios',
    icon: Library,
    href: '/exercises'
  },
  {
    title: 'Progreso',
    icon: TrendingUp,
    subItems: [
      {
        title: 'Métricas Generales',
        icon: BarChart3,
        href: '/progress'
      },
      {
        title: 'Objetivos',
        icon: Target,
        href: '/progress/goals'
      }
    ]
  },
  {
    title: 'Marca Personal',
    icon: Award,
    href: '/brand'
  }
]
