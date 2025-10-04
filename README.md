# 🏋️ GrowFit - Monorepo

Monorepo moderno para GrowFit usando **Turborepo + pnpm workspaces**.

## 🌐 URLs de Producción

- **Client:** https://app.growfyt.com
- **API:** https://api.growfyt.com (o Railway URL)
- **Sitio Web:** https://growfyt.com

---

## 📦 Estructura del Proyecto

```
growfit/
├── apps/
│   ├── client/          # Next.js 15 + Tailwind CSS + React 19
│   └── api/             # NestJS 11 + Prisma + PostgreSQL
├── packages/
│   └── shared/          # Código compartido (TypeScript)
├── turbo.json           # Configuración de Turborepo
├── pnpm-workspace.yaml  # Configuración de pnpm workspaces
└── package.json         # Scripts del monorepo
```

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Docker (para PostgreSQL)

### Instalación

```bash
# Instalar dependencias
pnpm install

# Iniciar base de datos PostgreSQL en Docker
docker run --name growfit-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=growfit \
  -p 5432:5432 \
  -v growfit-db-data:/var/lib/postgresql/data \
  -d postgres:15

# Generar Prisma Client y ejecutar migraciones
cd apps/api
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed
cd ../..
```

## 🛠️ Comandos Disponibles

### Modo Desarrollo

```bash
# Iniciar todo en modo desarrollo (API + Client)
pnpm dev

# Iniciar solo el API
pnpm --filter growfit-api dev

# Iniciar solo el Client
pnpm --filter growfit-client dev
```

**URLs en desarrollo:**

- 🌐 Client: http://localhost:3000
- 🔌 API: http://localhost:3001
- 📊 Prisma Studio: `pnpm --filter growfit-api prisma:studio`

### Modo Producción

```bash
# 1. Construir todo el proyecto
pnpm build

# 2. Iniciar en modo producción
pnpm start
```

**URLs en producción:**

- 🌐 Client: http://localhost:3000
- 🔌 API: http://localhost:3001

### Otros Comandos

```bash
# Type-checking
pnpm type-check

# Limpiar archivos compilados
pnpm clean

# Ver datos en la base de datos
pnpm --filter growfit-api prisma:studio
```

## 📁 Apps

### Client (Next.js 15)

- **Framework:** Next.js 15 con App Router
- **Styling:** Tailwind CSS 4
- **UI:** React 19
- **Puerto:** 3000

```bash
cd apps/client
pnpm dev        # Desarrollo
pnpm build      # Build
pnpm start      # Producción
```

### API (NestJS 11)

- **Framework:** NestJS 11
- **Database:** PostgreSQL + Prisma ORM
- **Puerto:** 3001

```bash
cd apps/api
pnpm dev                # Desarrollo
pnpm build              # Build
pnpm start              # Producción
pnpm prisma:generate    # Generar Prisma Client
pnpm prisma:migrate     # Ejecutar migraciones
pnpm prisma:studio      # Abrir Prisma Studio
pnpm prisma:seed        # Poblar base de datos
```

## 🗄️ Base de Datos

### Gestión de PostgreSQL con Docker

```bash
# Iniciar contenedor
docker start growfit-postgres

# Detener contenedor
docker stop growfit-postgres

# Ver logs
docker logs growfit-postgres

# Eliminar contenedor (¡cuidado! elimina los datos)
docker rm -f growfit-postgres
```

### Comandos de Prisma

```bash
cd apps/api

# Generar Prisma Client
pnpm prisma:generate

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
