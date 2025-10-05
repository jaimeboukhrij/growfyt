# GrowFyt - Documentación del Proyecto

## 📋 Índice

- [Inicio Rápido](./QUICKSTART.md)
- [Arquitectura del Proyecto](./ARCHITECTURE.md)
- [Guía de Desarrollo](./DEVELOPMENT.md)
- [Deployment en Railway](./DEPLOYMENT.md)

## 🚀 Descripción del Proyecto

GrowFyt es una aplicación monorepo construida con:
- **API**: NestJS + Prisma + PostgreSQL
- **Client**: Next.js 15 + TypeScript
- **Shared**: Paquete compartido de tipos y utilidades

## 📦 Estructura del Monorepo

```
growfit/
├── apps/
│   ├── api/          # Backend NestJS
│   └── client/       # Frontend Next.js
├── packages/
│   └── shared/       # Código compartido
├── scripts/          # Scripts de deployment
└── documentation/    # Documentación del proyecto
```

## 🛠️ Stack Tecnológico

### Backend (API)
- **Framework**: NestJS 10.x
- **ORM**: Prisma 6.x
- **Base de datos**: PostgreSQL
- **Node**: v20.x

### Frontend (Client)
- **Framework**: Next.js 15.x con Turbopack
- **Lenguaje**: TypeScript 5.x
- **Estilos**: Tailwind CSS

### Infraestructura
- **Monorepo**: TurboRepo + pnpm workspaces
- **Deployment**: Railway
- **CI/CD**: Git push to deploy

## 🌐 URLs

- **API**: https://api.growfyt.com
- **Client**: https://growfyt.com
- **API Health**: https://api.growfyt.com/api/health

## 📝 Scripts Principales

```bash
# Instalar dependencias
pnpm install

# Desarrollo
pnpm dev              # Inicia todos los proyectos
pnpm dev:api          # Solo API
pnpm dev:client       # Solo Client

# Build
pnpm build            # Build todos los proyectos
pnpm build --filter=growfit-api    # Solo API
pnpm build --filter=growfit-client # Solo Client

# Prisma
pnpm --filter=growfit-api prisma:generate  # Generar Prisma Client
pnpm --filter=growfit-api prisma:migrate   # Ejecutar migraciones
pnpm --filter=growfit-api prisma:studio    # Abrir Prisma Studio

# Type checking
pnpm type-check       # Verificar tipos en todos los proyectos
```

## 🔧 Requisitos Previos

- Node.js 20.x o superior
- pnpm 9.x
- PostgreSQL (local o Railway)

## 📚 Documentación Adicional

Para información más detallada, consulta los siguientes documentos:

- **[QUICKSTART.md](./QUICKSTART.md)** - Cómo empezar a desarrollar
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arquitectura y decisiones de diseño
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Guía de desarrollo y convenciones
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Proceso de deployment en Railway

## 🤝 Contribuir

Para contribuir al proyecto:

1. Crea una rama desde `main`
2. Realiza tus cambios
3. Asegúrate de que `pnpm build` funcione sin errores
4. Haz commit siguiendo [Conventional Commits](https://www.conventionalcommits.org/)
5. Crea un Pull Request

## 📄 Licencia

Copyright © 2025 GrowFyt
