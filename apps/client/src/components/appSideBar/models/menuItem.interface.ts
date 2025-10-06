export interface MenuItem {
  title: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  subItems?: MenuItem[]
}
