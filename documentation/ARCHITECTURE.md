# 🏗️ Arquitectura del Proyecto

Esta guía explica las decisiones de arquitectura y la estructura del monorepo GrowFyt.

## 📐 Arquitectura General

GrowFyt utiliza una arquitectura de **monorepo** que permite compartir código entre aplicaciones mientras mantiene la separación de responsabilidades.

```
┌─────────────────────────────────────────────────────────┐
│                    Monorepo GrowFyt                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Client     │  │     API      │  │   Shared     │ │
│  │  (Next.js)   │◄─┤   (NestJS)   │◄─┤  (TypeScript)│ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│         │                 │                            │
│         │                 │                            │
│         ▼                 ▼                            │
│   Usuarios Web      PostgreSQL                        │
│                     (Railway)                          │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Decisiones de Arquitectura

### ¿Por qué Monorepo?

1. **Compartir tipos**: TypeScript types compartidos entre frontend y backend
2. **Desarrollo atómico**: Cambios en API y Client en un solo commit
3. **CI/CD simplificado**: Un solo pipeline para todo
4. **DRY principle**: Lógica común en `shared` package

### ¿Por qué TurboRepo?

- Build cache inteligente
- Ejecución paralela de tareas
- Gestión de dependencias entre paquetes
- Optimización para monorepos

### ¿Por qué pnpm?

- Más rápido que npm/yarn
- Menos espacio en disco (symlinks)
- Mejor soporte para workspaces
- Node_modules más limpios

## 📦 Estructura de Paquetes

### 1. API (`apps/api`)

**Tecnologías:**
- NestJS 10.x
- Prisma 6.x
- PostgreSQL
- TypeScript

**Responsabilidades:**
- Lógica de negocio
- Acceso a base de datos
- Autenticación y autorización
- APIs RESTful

**Estructura:**

```
apps/api/
├── src/
│   ├── main.ts              # Entry point
│   ├── app.module.ts        # Módulo raíz
│   ├── app.controller.ts    # Controller raíz
│   ├── prisma/              # Prisma service
│   └── users/               # Feature modules
│       ├── users.module.ts
│       ├── users.controller.ts
│       └── users.service.ts
├── prisma/
│   ├── schema.prisma        # Schema de DB
│   ├── migrations/          # Migraciones
│   └── seed.ts              # Seed de datos
└── package.json
```

**Patrones:**
- **Modular architecture**: Cada feature en su módulo
- **Dependency injection**: Para testabilidad
- **DTOs**: Para validación de entrada
- **Prisma**: Como capa de abstracción de DB

### 2. Client (`apps/client`)

**Tecnologías:**
- Next.js 15.x con App Router
- React 19
- TypeScript
- Tailwind CSS

**Responsabilidades:**
- UI/UX
- Server Components
- Client Components
- Routing

**Estructura:**

```
apps/client/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Estilos globales
│   └── [routes]/            # Otras rutas
├── src/
│   ├── components/          # React components
│   ├── lib/                 # Utilidades
│   └── hooks/               # Custom hooks
└── package.json
```

**Patrones:**
- **App Router**: Routing de Next.js 15
- **Server Components**: Por defecto
- **Client Components**: Solo cuando es necesario
- **Composition**: Componentes pequeños y reutilizables

### 3. Shared (`packages/shared`)

**Responsabilidades:**
- Tipos TypeScript compartidos
- Constantes
- Utilidades comunes
- Validators

**Estructura:**

```
packages/shared/
├── src/
│   ├── index.ts             # Exports públicos
│   ├── types/               # TypeScript types
│   ├── constants/           # Constantes
│   └── utils/               # Utilidades
└── package.json
```

**Uso:**

```typescript
// En API o Client
import { APP_NAME, UserType } from 'growfit-shared';
```

## 🔄 Flujo de Datos

### Request Flow (Client → API)

```
1. Usuario → Next.js Client
2. Client → fetch('https://api.growfyt.com/api/...')
3. API → NestJS Controller
4. Controller → Service
5. Service → Prisma
6. Prisma → PostgreSQL
7. PostgreSQL → Prisma
8. Prisma → Service
9. Service → Controller
10. Controller → Client
11. Client → Usuario
```

### Build Flow (Deployment)

```
1. git push → Railway
2. Railway → Install dependencies (pnpm install)
3. Railway → Clean caches
4. Railway → Turbo: prisma:generate
5. Railway → Turbo: build (shared)
6. Railway → Turbo: build (api)
7. Railway → Turbo: build (client)
8. Railway → Migrations (prisma migrate deploy)
9. Railway → Start app
```

## 🗄️ Base de Datos

### Prisma Schema

El schema de Prisma define:
- **Models**: Tablas de la DB
- **Relations**: Relaciones entre tablas
- **Indexes**: Para performance
- **Enums**: Para tipos enumerados

**Ejemplo:**

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Migraciones

Las migraciones se gestionan con Prisma Migrate:

```bash
# Crear migración
pnpm prisma migrate dev --name add_user_role

# Deploy en producción
pnpm prisma migrate deploy
```

## 🚀 Deployment

### Railway Configuration

**API:**
- Build Command: `bash scripts/railway-start.sh`
- Start Command: Manejado por el script
- Environment: Node.js 20
- Database: PostgreSQL

**Client:**
- Build Command: `pnpm build --filter=growfit-client`
- Start Command: `cd apps/client && pnpm start`
- Environment: Node.js 20

### Dominios

- `api.growfyt.com` → API Service
- `growfyt.com` → Client Service

## 🔧 TurboRepo Pipeline

El archivo `turbo.json` define:

```json
{
  "pipeline": {
    "prisma:generate": {
      "cache": false
    },
    "build": {
      "dependsOn": ["^build", "prisma:generate"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

**Orden de ejecución:**

1. `prisma:generate` (en api)
2. `build` (en shared) - paralelo
3. `build` (en api) - depende de shared
4. `build` (en client) - paralelo con api

## 🔐 Seguridad

### API

- Environment variables para secretos
- CORS configurado
- Rate limiting (futuro)
- Input validation con DTOs

### Database

- Connection string en variables de entorno
- Prisma como única interfaz de acceso
- Migraciones versionadas

## 📊 Performance

### Optimizaciones

1. **Build cache**: TurboRepo cachea builds
2. **Incremental builds**: TypeScript incremental
3. **Code splitting**: Next.js automático
4. **Database indexing**: En Prisma schema
5. **pnpm**: Symlinks para node_modules

## 🧪 Testing (Futuro)

### Estructura propuesta

```
apps/api/
├── src/
│   └── users/
│       ├── users.service.ts
│       └── users.service.spec.ts  # Unit tests
└── test/
    └── users.e2e-spec.ts           # E2E tests
```

## 📈 Escalabilidad

### Horizontal Scaling

- Railway auto-scaling
- Stateless API
- Database connection pooling

### Vertical Scaling

- Optimizar queries Prisma
- Caching (Redis en futuro)
- CDN para assets estáticos

## 🔄 CI/CD

**Actual:**
- Git push → Railway build → Deploy

**Futuro:**
- GitHub Actions para tests
- Lint en CI
- Type checking en CI
- Preview deployments

## 📚 Referencias

- [NestJS Docs](https://docs.nestjs.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [TurboRepo Docs](https://turbo.build/repo/docs)
- [pnpm Docs](https://pnpm.io/)
