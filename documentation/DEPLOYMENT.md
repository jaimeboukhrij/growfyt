# 🚀 Deployment en Railway

Guía completa para desplegar GrowFyt en Railway.

## 📋 Requisitos Previos

- Cuenta en [Railway](https://railway.app)
- Proyecto GrowFyt en GitHub
- PostgreSQL configurado en Railway

## 🎯 Arquitectura de Deployment

```
GitHub Repository
       ↓
   Railway
       ↓
    ┌─────────────┐
    │   Project   │
    └─────────────┘
          ↓
    ┌─────┴─────┐
    ↓           ↓
┌────────┐  ┌────────┐
│  API   │  │ Client │
│Service │  │Service │
└────────┘  └────────┘
    ↓           ↓
┌────────┐
│Postgres│
└────────┘
```

## 🔧 Setup Inicial

### 1. Crear Proyecto en Railway

1. Ve a [railway.app](https://railway.app)
2. Click en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Autoriza Railway y selecciona el repo `growfit`

### 2. Configurar PostgreSQL

1. En el proyecto, click en "+ New"
2. Selecciona "Database" → "PostgreSQL"
3. Railway creará la base de datos automáticamente
4. Copia la variable `DATABASE_URL`

### 3. Crear Service para API

1. Click en "+ New" → "GitHub Repo"
2. Selecciona tu repositorio
3. Railway detectará automáticamente el proyecto

**Configuración del Service:**

- **Name**: `growfit-api`
- **Root Directory**: `/` (monorepo root)
- **Build Command**: `bash scripts/railway-start.sh`
- **Start Command**: Manejado por el script

**Variables de entorno:**

```env
DATABASE_URL=postgresql://... (copiar de PostgreSQL service)
NODE_ENV=production
PORT=3001
```

**Settings:**
- **Deploy Trigger**: Solo desplegar cuando cambien archivos en `apps/api/` o `packages/shared/`

### 4. Crear Service para Client

1. Click en "+ New" → "GitHub Repo"
2. Selecciona tu repositorio (otra vez)

**Configuración del Service:**

- **Name**: `growfit-client`
- **Root Directory**: `/` (monorepo root)
- **Build Command**: `pnpm install && pnpm --filter=growfit-shared build && pnpm --filter=growfit-client build`
- **Start Command**: `cd apps/client && pnpm start`

**Variables de entorno:**

```env
NEXT_PUBLIC_API_URL=https://api.growfyt.com
NODE_ENV=production
```

**Settings:**
- **Deploy Trigger**: Solo desplegar cuando cambien archivos en `apps/client/` o `packages/shared/`

## 🌐 Configurar Dominios

### API Domain

1. Abre el service `growfit-api`
2. Ve a "Settings" → "Domains"
3. Click en "Custom Domain"
4. Ingresa: `api.growfyt.com`
5. Railway te dará un CNAME record

**En tu proveedor de DNS (ej: Cloudflare):**

```
Type: CNAME
Name: api
Value: <railway-value>.railway.app
Proxy: Off (importante)
```

### Client Domain

1. Abre el service `growfit-client`
2. Ve a "Settings" → "Domains"
3. Click en "Custom Domain"
4. Ingresa: `growfyt.com`

**En tu proveedor de DNS:**

```
Type: CNAME
Name: @
Value: <railway-value>.railway.app

Type: CNAME
Name: www
Value: <railway-value>.railway.app
```

## 📝 Scripts de Deployment

### `scripts/railway-start.sh`

Este script maneja todo el proceso de build y deployment de la API:

```bash
#!/bin/bash
set -e

# 1. Limpiar caches
rm -rf packages/shared/tsconfig.tsbuildinfo apps/api/tsconfig.build.tsbuildinfo

# 2. Build con Turbo (incluye prisma:generate)
pnpm turbo run build

# 3. Verificar builds
if [ ! -d "packages/shared/dist" ]; then
    echo "❌ ERROR: packages/shared/dist not found"
    exit 1
fi

# 4. Migraciones de base de datos
cd apps/api
npx prisma migrate deploy
cd ../..

# 5. Copiar shared package
mkdir -p apps/api/node_modules/growfit-shared
cp -r packages/shared/dist apps/api/node_modules/growfit-shared/
cp packages/shared/package.json apps/api/node_modules/growfit-shared/

# 6. Iniciar aplicación
cd apps/api
node dist/apps/api/src/main.js
```

## 🔄 Proceso de Deployment

### Automatic Deployment

Cada vez que haces `git push origin main`:

1. **Railway detecta el push**
2. **Ejecuta el build:**
   - Instala dependencias con pnpm
   - Limpia caches de TypeScript
   - Genera Prisma Client
   - Compila packages (shared → api → client)
   - Ejecuta migraciones
3. **Health checks:**
   - Verifica que la app responda
4. **Traffic switching:**
   - Si todo OK, cambia el tráfico a la nueva versión
   - Si falla, mantiene la versión anterior

### Manual Deployment

```bash
# 1. Hacer cambios localmente
git add .
git commit -m "feat: add new feature"

# 2. Push a GitHub
git push origin main

# 3. Ver logs en Railway
# Dashboard → Service → Deployments → View Logs
```

## 🔍 Monitorear Deployment

### Build Logs

En Railway Dashboard:
1. Selecciona el service
2. Click en "Deployments"
3. Click en el deployment más reciente
4. Ver "Build Logs"

**Lo que deberías ver:**

```
✓ Installing dependencies with pnpm
✓ Cleaning TypeScript caches
✓ Building packages with Turbo
  ✓ prisma:generate
  ✓ growfit-shared:build
  ✓ growfit-api:build
✓ Running database migrations
✓ Starting application
```

### Application Logs

```
✓ Nest application successfully started
✓ Server running on port 3001
```

### Health Checks

Verifica que los endpoints funcionen:

```bash
# API Health
curl https://api.growfyt.com/api/health

# Response:
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2025-01-05T..."
  }
}

# Client
curl https://growfyt.com
# Should return HTML
```

## 🐛 Troubleshooting

### Build Fails

**Error: Cannot find module 'growfit-shared'**

```bash
# Verificar que shared se buildeó
# En railway-start.sh debe haber:
pnpm turbo run build  # Esto debería buildear shared primero
```

**Error: Prisma Client not generated**

```bash
# Verificar que prisma:generate está en turbo.json
{
  "pipeline": {
    "prisma:generate": { ... },
    "build": {
      "dependsOn": ["^build", "prisma:generate"]
    }
  }
}
```

**Error: TypeScript compilation fails**

```bash
# Limpiar caches y rebuilidear
rm -rf packages/shared/tsconfig.tsbuildinfo
rm -rf apps/api/tsconfig.build.tsbuildinfo
pnpm build
```

### Runtime Errors

**Error: Database connection failed**

```bash
# Verificar DATABASE_URL en variables de entorno
# Debe ser la connection string de PostgreSQL service
```

**Error: Port already in use**

```bash
# Railway asigna el puerto automáticamente
# Verificar en main.ts:
const port = process.env.PORT || 3001;
await app.listen(port, '0.0.0.0');
```

### Domain Issues

**Error: 404 Not Found**

```bash
# Verificar:
1. CNAME record en DNS apunta a Railway
2. Proxy está OFF en Cloudflare
3. Domain está configurado en Railway Settings
4. Esperar propagación DNS (hasta 24h)
```

**Error: SSL Certificate Error**

```bash
# Railway maneja SSL automáticamente
# Si hay error:
1. Verificar que el domain está verificado
2. Esperar unos minutos para provisioning
3. Verificar en Settings → Domains
```

## 📊 Monitoring

### Railway Metrics

Railway provee:
- **CPU Usage**: Uso de CPU
- **Memory Usage**: Uso de memoria
- **Network**: Tráfico de red
- **Requests**: Número de requests

### Database Metrics

PostgreSQL service muestra:
- **Connections**: Número de conexiones activas
- **Storage**: Uso de disco
- **Queries**: Queries ejecutadas

### Custom Monitoring (Futuro)

Considera agregar:
- **Sentry**: Para error tracking
- **LogRocket**: Para session replay
- **Datadog**: Para APM

## 💰 Costos

Railway usa un modelo de "usage-based pricing":

### Free Tier ($5 gratis/mes)
- Suficiente para desarrollo
- Incluye:
  - 512 MB RAM
  - Shared CPU
  - 1 GB Storage

### Pro Plan ($20/mes)
- Para producción
- Incluye:
  - $20 créditos/mes
  - Más RAM y CPU
  - Priority support

### Costos Estimados (Producción)

- **API Service**: ~$10-15/mes
- **Client Service**: ~$10-15/mes
- **PostgreSQL**: ~$5-10/mes
- **Total**: ~$25-40/mes

## 🔐 Seguridad

### Environment Variables

**Nunca** commitees:
- `DATABASE_URL`
- `JWT_SECRET`
- API keys

Usa Railway's variables de entorno.

### Secrets

Para secretos sensibles:
1. Railway → Service → Variables
2. Click en "New Variable"
3. Marca como "Secret" (no visible en logs)

## 📈 Scaling

### Horizontal Scaling

```
# Railway Settings → Replicas
Replicas: 2

Esto creará:
- 2 instancias de la API
- Load balancer automático
```

### Vertical Scaling

```
# Railway Settings → Resources
Memory: 1 GB → 2 GB
CPU: Shared → Dedicated
```

## 🔄 Rollback

Si un deployment falla:

1. Railway → Service → Deployments
2. Click en un deployment anterior exitoso
3. Click en "Redeploy"

O usando Railway CLI:

```bash
railway up --detach
railway logs
railway rollback
```

## 📚 Referencias

- [Railway Docs](https://docs.railway.app)
- [Railway CLI](https://docs.railway.app/develop/cli)
- [Prisma on Railway](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-railway)
- [Next.js on Railway](https://docs.railway.app/guides/nextjs)

## 🆘 Soporte

Si tienes problemas:

1. Revisa los logs en Railway
2. Consulta la documentación
3. Railway Discord: [discord.gg/railway](https://discord.gg/railway)
4. Railway Support: support@railway.app

---

¡Deployment exitoso! 🚀
