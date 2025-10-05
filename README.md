# 🚀 GrowFyt - Monorepo

Aplicación fullstack construida con NestJS, Next.js y Prisma en un monorepo con TurboRepo.

## 🌐 Aplicación en Vivo

- **API**: https://api.growfyt.com
- **Cliente**: https://growfyt.com
- **Health Check**: https://api.growfyt.com/api/health

## 📦 Estructura del Proyecto

```
growfit/
├── apps/
│   ├── api/          # Backend NestJS + Prisma
│   └── client/       # Frontend Next.js 15
├── packages/
│   └── shared/       # Código compartido (tipos, utilidades)
├── scripts/          # Scripts de deployment
└── documentation/    # Documentación del proyecto
```

## 🛠️ Stack Tecnológico

- **Backend**: NestJS 10, Prisma 6, PostgreSQL
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Monorepo**: TurboRepo + pnpm workspaces
- **Deployment**: Railway
- **Node**: v20.x

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
pnpm install

# 2. Configurar base de datos
cp apps/api/.env.example apps/api/.env
# Editar DATABASE_URL en apps/api/.env

# 3. Setup Prisma
cd apps/api
pnpm prisma:generate
pnpm prisma:migrate
cd ../..

# 4. Iniciar en desarrollo
cd apps/api
pnpm dev
```

La API estará en `http://localhost:3001` y el cliente en `http://localhost:3000`.

## � Scripts Principales

```bash
# Desarrollo
pnpm dev              # Inicia todos los proyectos
pnpm dev:api          # Solo API
pnpm dev:client       # Solo Client

# Build
pnpm build            # Build todos los proyectos

# Prisma
pnpm --filter=growfit-api prisma:generate  # Generar Prisma Client
pnpm --filter=growfit-api prisma:migrate   # Ejecutar migraciones
pnpm --filter=growfit-api prisma:studio    # Abrir Prisma Studio

# Type checking
pnpm type-check       # Verificar tipos TypeScript
```

## 📚 Documentación

- **[Inicio Rápido](./documentation/QUICKSTART.md)** - Setup inicial y primeros pasos
- **[Arquitectura](./documentation/ARCHITECTURE.md)** - Decisiones de arquitectura
- **[Desarrollo](./documentation/DEVELOPMENT.md)** - Guía de desarrollo y convenciones
- **[Deployment](./documentation/DEPLOYMENT.md)** - Deploy en Railway

## 🏗️ Características

### API (NestJS)

- ✅ Arquitectura modular
- ✅ Prisma ORM con PostgreSQL
- ✅ Validación con class-validator
- ✅ Respuestas estandarizadas
- ✅ Health check endpoint
- ✅ Hot reload en desarrollo

### Client (Next.js)

- ✅ App Router (Next.js 15)
- ✅ Server Components por defecto
- ✅ TypeScript estricto
- ✅ Tailwind CSS
- ✅ Turbopack (build rápido)

### Shared Package

- ✅ Tipos TypeScript compartidos
- ✅ Constantes comunes
- ✅ Build automático con Turbo

## 🔧 Requisitos

- **Node.js**: v20.x o superior
- **pnpm**: v9.x
- **PostgreSQL**: v14 o superior

## 🌐 Deployment

El proyecto está configurado para deployment automático en Railway:

```bash
git push origin main  # Auto-deploya a Railway
```

Ver [DEPLOYMENT.md](./documentation/DEPLOYMENT.md) para más detalles.

## 🤝 Contribuir

1. Crea una rama desde `main`
2. Haz tus cambios
3. Asegúrate de que `pnpm build` funciona
4. Commit con [Conventional Commits](https://www.conventionalcommits.org/)
5. Push y crea un PR

## 📄 Licencia

Copyright © 2025 GrowFyt

---

Para más información, consulta la [documentación completa](./documentation/README.md).


# Crear y aplicar migración
pnpm prisma:migrate

# Abrir Prisma Studio (GUI para ver datos)
pnpm prisma:studio

# Poblar base de datos con datos de prueba
pnpm prisma:seed
```

## 🔧 Tecnologías

### Frontend

- Next.js 15
- React 19
- Tailwind CSS 4
- TypeScript 5

### Backend

- NestJS 11
- Prisma ORM
- PostgreSQL 15
- TypeScript 5

### Tooling

- Turborepo
- pnpm workspaces
- ESLint
- tsx (para ejecutar TypeScript)

## 📝 Variables de Entorno

### API (`apps/api/.env`)

```env
NODE_ENV=development
PORT=3001
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/growfit?schema=public"
CORS_ORIGIN=http://localhost:3000
```

### Client (`apps/client/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🚀 Despliegue

Para desplegar la aplicación en producción, consulta la guía completa: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

### Resumen rápido:

- **Client (Next.js)** → Desplegar en **Vercel**
  - Root directory: `apps/client`
  - Build command: `cd ../.. && pnpm install && pnpm --filter growfit-client build`
- **API (NestJS) + PostgreSQL** → Desplegar en **Railway**
  - Root directory: `/` (monorepo root)
  - Build command: `pnpm install && pnpm --filter growfit-api build && cd apps/api && pnpm prisma:generate`
  - Start command: `cd apps/api && node dist/apps/api/src/main.js`

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones detalladas paso a paso.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y confidencial.
