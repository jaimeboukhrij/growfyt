# 🚂 Guía Simple: Desplegar en Railway

## Por qué Railway es Simple

Railway **detecta automáticamente** tu proyecto y lo configura. No necesitas archivos de configuración especiales como `Dockerfile`, `railway.toml` o `railway.json`.

---

## 🚀 Pasos para Desplegar

### 1. Crear Proyecto

1. Ve a [railway.app](https://railway.app)
2. Login con GitHub
3. Click **"New Project"**
4. **"Deploy from GitHub repo"**
5. Selecciona tu repositorio `growfit`

### 2. Agregar PostgreSQL

1. En tu proyecto, click **"+ New"**
2. **"Database" → "PostgreSQL"**
3. ✅ Railway crea automáticamente:
   - Base de datos
   - Variable `DATABASE_URL`
   - Usuario y password

### 3. Configurar el Servicio API

#### Variables de Entorno

1. Click en tu servicio (el que no es la base de datos)
2. **Settings → Variables**
3. Agregar estas 2 variables:

```env
NODE_ENV=production
CORS_ORIGIN=https://app.growfyt.com
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

⚠️ **Importante:** 
- `DATABASE_URL` usa `${{Postgres.DATABASE_URL}}` (Railway lo referencia automáticamente)
- **NO** necesitas configurar `PORT`, Railway lo hace automáticamente

#### Configurar Build y Deploy

1. **Settings → Deploy**
2. Configurar:

**Root Directory:**
```
apps/api
```

**Build Command:**
```bash
cd ../.. && pnpm install && pnpm --filter growfit-shared build && pnpm --filter growfit-api build && cd apps/api && pnpm prisma:generate
```

**Start Command:**
```bash
pnpm prisma:migrate deploy && node dist/apps/api/src/main.js
```

**Watch Paths (opcional):**
```
apps/api/**
packages/shared/**
```

3. **Save**

### 4. Desplegar

1. Railway deployará automáticamente
2. Espera 2-5 minutos
3. Verifica los logs en la pestaña **"Deployments"**

### 5. Obtener URL del API

1. **Settings → Networking**
2. **Generate Domain**
3. Copia la URL (ej: `https://growfit-api-production.up.railway.app`)
4. Actualiza `NEXT_PUBLIC_API_URL` en Vercel con esta URL

---

## ✅ Verificar que Funciona

```bash
# Reemplaza con tu URL de Railway
curl https://tu-api.up.railway.app/api/health

# Debe responder:
# {"success":true,"data":{"status":"healthy",...}}
```

---

## 🐛 Troubleshooting

### ❌ Error: "Application failed to respond"

**Causa:** El puerto no está configurado correctamente

**Solución:** Verifica que tu código use `process.env.PORT`:

```typescript
// apps/api/src/main.ts
const port = process.env.PORT || 3001;
await app.listen(port, '0.0.0.0');
```

### ❌ Error: Prisma Client not found

**Causa:** `prisma:generate` no se ejecutó

**Solución:** Asegúrate de que el Build Command incluye:
```bash
&& cd apps/api && pnpm prisma:generate
```

### ❌ Error: Database connection failed

**Causa:** `DATABASE_URL` mal configurada

**Solución:** Usa la referencia de Railway:
```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

### ❌ Migraciones no se ejecutan

**Causa:** El Start Command no incluye migraciones

**Solución:** Asegúrate de que el Start Command empiece con:
```bash
pnpm prisma:migrate deploy && ...
```

---

## 🎯 Lo que NO Necesitas

- ❌ `railway.toml` - No es necesario
- ❌ `railway.json` - No es necesario
- ❌ `Dockerfile` - Railway usa Nixpacks automáticamente
- ❌ `nixpacks.toml` - Opcional, solo si necesitas configuración avanzada

Railway detecta automáticamente:
- ✅ Que es un proyecto Node.js
- ✅ Que usa pnpm
- ✅ Que necesita instalar dependencias
- ✅ El puerto donde debe escuchar

---

## 📝 Resumen

**Variables obligatorias:**
- `NODE_ENV=production`
- `CORS_ORIGIN=https://app.growfyt.com`
- `DATABASE_URL=${{Postgres.DATABASE_URL}}`

**Comandos importantes:**
- **Build:** Instalar, compilar, generar Prisma
- **Start:** Migrar DB y ejecutar servidor

**Tiempo de deploy:** 2-5 minutos

---

¡Listo! Tu API estará corriendo en Railway 🚀
