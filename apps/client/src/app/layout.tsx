import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Suspense } from "react"
import { AppSidebar, AppTopMenu } from "@/components"

export const metadata: Metadata = {
  title: "CoachPro - Plataforma Profesional para Coaches",
  description: "Gestiona clientes, rutinas y progreso de forma profesional",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans  antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <AppTopMenu title="Dashboard" description="Resumen general de tu actividad como coach" />

              {children}</SidebarInset>
          </SidebarProvider>
        </Suspense>
      </body>
    </html>
  )
}
