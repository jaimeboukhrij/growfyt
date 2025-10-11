import type { Metadata } from 'next'
import React, { Suspense } from 'react'

import './globals.css'
import { AppSidebar, AppTopMenu } from '@/components'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import ReactQueryProvider from '@/providers/ReactQueryProvider'

export const metadata: Metadata = {
  title: 'CoachPro - Plataforma Profesional para Coaches',
  description: 'Gestiona clientes, rutinas y progreso de forma profesional',
  generator: 'v0.app'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans  antialiased">
        <Suspense fallback={<div>Loading...</div>}>
          <ReactQueryProvider>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <AppTopMenu title="Dashboard" description="Resumen general de tu actividad como coach" />
                {children}
              </SidebarInset>
            </SidebarProvider>
          </ReactQueryProvider>
        </Suspense>
      </body>
    </html>
  )
}
