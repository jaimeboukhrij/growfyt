import {
  Sidebar
} from '@/components/ui/sidebar'

import { Content } from './components/Content'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

export function AppSidebar () {
  return (
    <Sidebar>
      <Header />
      <Content />
      <Footer />
    </Sidebar>
  )
}
