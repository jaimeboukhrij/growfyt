# 🚀 Inicio Rápido - GrowFyt

Esta guía te ayudará a configurar el proyecto en tu máquina local en menos de 5 minutos.

## ⚡ Quick Setup

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd growfit

# 2. Instalar dependencias
pnpm install

# 3. Configurar variables de entorno
cp apps/api/.env.example apps/api/.env
# Edita apps/api/.env con tu DATABASE_URL

# 4. Setup de base de datos
cd apps/api
pnpm prisma:generate
pnpm prisma:migrate
cd ../..

# 5. Iniciar en modo desarrollo
pnpm dev
```

## 📋 Requisitos

- **Node.js**: v20.x o superior
- **pnpm**: v9.x
- **PostgreSQL**: v14 o superior (local o remoto)

### Instalar pnpm

Si no tienes pnpm instalado:

```bash
npm install -g pnpm@9
```

## 🗄️ Base de Datos

### Opción 1: PostgreSQL Local

```bash
# macOS (con Homebrew)
brew install postgresql@14
brew services start postgresql@14

# Crear base de datos
createdb growfit_dev
```

### Opción 2: PostgreSQL en Railway

1. Ve a [Railway](https://railway.app)
2. Crea un nuevo proyecto PostgreSQL
3. Copia el `DATABASE_URL` generado

## 🔧 Configuración de Variables de Entorno

### API (`apps/api/.env`)

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/growfit_dev"

# App
PORT=3001
NODE_ENV=development

# JWT (opcional para desarrollo)
JWT_SECRET="your-dev-secret-key"
```

## 🎯 Comandos de Desarrollo

### Iniciar todos los proyectos

```bash
pnpm dev
```

Esto iniciará:
- **API** en `http://localhost:3001`
- **Client** en `http://localhost:3000`

### Iniciar proyectos individualmente

```bash
# Solo API
pnpm --filter=growfit-api dev

# Solo Client
pnpm --filter=growfit-client dev
```

## 🔍 Verificar que todo funciona

### 1. API Health Check

Abre en tu navegador: http://localhost:3001/api/health

Deberías ver:

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2025-01-05T..."
  }
}
```

### 2. Client

Abre en tu navegador: http://localhost:3000

Deberías ver la página de inicio de GrowFyt.

### 3. Shared Package

El paquete compartido se compila automáticamente cuando cambias archivos.

## 🗃️ Prisma Commands

```bash
# Generar Prisma Client (después de cambios en schema.prisma)
pnpm --filter=growfit-api prisma:generate

# Crear una migración
pnpm --filter=growfit-api prisma:migrate

# Abrir Prisma Studio (GUI para la DB)
pnpm --filter=growfit-api prisma:studio

# Seed de datos (si existe seed.ts)
pnpm --filter=growfit-api prisma:seed
```

## 📦 Estructura de Desarrollo

```
growfit/
├── apps/
│   ├── api/
│   │   ├── src/           # Código fuente
│   │   ├── prisma/        # Schema y migraciones
│   │   └── .env           # Variables de entorno
│   │
│   └── client/
│       ├── app/           # App Router de Next.js
│       └── src/           # Componentes y lógica
│
└── packages/
    └── shared/
        └── src/           # Tipos y utilidades compartidas
```

## 🐛 Troubleshooting

### Error: "Cannot find module 'growfit-shared'"

```bash
# Regenerar el paquete shared
pnpm --filter=growfit-shared build
```

### Error: Prisma Client no generado

```bash
cd apps/api
pnpm prisma:generate
cd ../..
```

### Error: Puerto 3001 en uso

```bash
# Encontrar el proceso
lsof -ti:3001

# Matar el proceso
kill -9 $(lsof -ti:3001)
```

### Error: Base de datos no conecta

1. Verifica que PostgreSQL esté corriendo
2. Verifica `DATABASE_URL` en `.env`
3. Intenta conectarte manualmente:

```bash
psql postgresql://user:password@localhost:5432/growfit_dev
```

## 📝 Next Steps

Ahora que tienes el proyecto corriendo:

1. Lee [ARCHITECTURE.md](./ARCHITECTURE.md) para entender la estructura
2. Lee [DEVELOPMENT.md](./DEVELOPMENT.md) para convenciones de código
3. Explora el código en `apps/api/src` y `apps/client/app`

## 🆘 ¿Necesitas Ayuda?

Si encuentras problemas:

1. Revisa la [documentación](./README.md)
2. Verifica los logs en la terminal
3. Contacta al equipo de desarrollo

¡Happy coding! 🎉
