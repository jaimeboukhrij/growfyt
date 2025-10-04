# 🚀 Guía de Despliegue - GrowFit

Esta guía te ayudará a desplegar tu aplicación en **Vercel** (Frontend) y **Railway** (Backend + Database).

---

## 📋 Resumen

- **Client (Next.js)** → Vercel
- **API (NestJS) + PostgreSQL** → Railway

---

## 🌐 Desplegar Client en Vercel

### Opción 1: Desde la Interfaz de Vercel (Recomendado)

1. **Ir a [vercel.com](https://vercel.com)** y hacer login
2. Click en **"Add New Project"**
3. **Importar tu repositorio** de GitHub/GitLab/Bitbucket
4. **Configurar el proyecto:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `apps/client`
   - **Build Command:** `cd ../.. && pnpm install && pnpm --filter growfit-client build`
   - **Output Directory:** `.next`
   - **Install Command:** `pnpm install`

5. **Variables de Entorno:**
   ```
   NEXT_PUBLIC_API_URL=https://tu-api.railway.app
   ```

6. Click en **"Deploy"**

### Opción 2: Desde la CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desde el directorio del client
cd apps/client

# Desplegar
vercel

# Para producción
vercel --prod
```

### Configuración Automática

El archivo `apps/client/vercel.json` ya está configurado con:
- Build command optimizado para monorepo
- Output directory
- Framework detection

---

## 🚂 Desplegar API en Railway

### Paso 1: Crear Proyecto en Railway

1. **Ir a [railway.app](https://railway.app)** y hacer login
2. Click en **"New Project"**
3. Seleccionar **"Deploy from GitHub repo"**
4. Autorizar y seleccionar tu repositorio

### Paso 2: Configurar PostgreSQL

1. En tu proyecto de Railway, click en **"+ New"**
2. Seleccionar **"Database" → "PostgreSQL"**
3. Railway creará automáticamente la base de datos
4. Copiar la **DATABASE_URL** (se genera automáticamente)

### Paso 3: Configurar el API

1. Click en **"+ New"** → **"Empty Service"**
2. Conectar tu repositorio
3. **Configurar variables de entorno:**

```bash
NODE_ENV=production
PORT=${{PORT}}  # Railway lo asigna automáticamente
DATABASE_URL=${{Postgres.DATABASE_URL}}  # Referencia a tu BD
CORS_ORIGIN=https://tu-app.vercel.app
```

4. **Configurar Build Settings:**
   - **Root Directory:** `/` (raíz del monorepo)
   - **Build Command:** `pnpm install && pnpm --filter growfit-api build && cd apps/api && pnpm prisma:generate`
   - **Start Command:** `cd apps/api && node dist/apps/api/src/main.js`

5. **Ejecutar migraciones:**
   - Ve a la pestaña **"Settings" → "Deploy"**
   - En **"Deploy Command"** añade antes del start:
   ```bash
   cd apps/api && pnpm prisma:migrate deploy && cd ../.. && cd apps/api && node dist/apps/api/src/main.js
   ```

### Opción con Dockerfile

Railway también puede usar el `Dockerfile` que hemos creado:

1. Railway detectará automáticamente el `Dockerfile` en `apps/api/`
2. Construirá la imagen y la desplegará
3. Solo necesitas configurar las variables de entorno

### Paso 4: Configurar Dominio

1. En el servicio del API, ve a **"Settings"**
2. En **"Domains"**, genera un dominio público
3. Copia la URL (ej: `https://tu-api.up.railway.app`)
4. Actualiza `NEXT_PUBLIC_API_URL` en Vercel con esta URL

---

## 🔐 Variables de Entorno

### Vercel (Client)

```env
NEXT_PUBLIC_API_URL=https://tu-api.railway.app
```

### Railway (API)

```env
NODE_ENV=production
PORT=${{PORT}}
DATABASE_URL=${{Postgres.DATABASE_URL}}
CORS_ORIGIN=https://tu-app.vercel.app
```

---

## 🗄️ Migraciones de Base de Datos

### Primera vez (después del despliegue)

Ejecuta las migraciones desde el dashboard de Railway:

1. Ve a tu servicio de API
2. Click en **"Deploy Logs"**
3. O usa Railway CLI:

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Seleccionar proyecto
railway link

# Ejecutar migraciones
railway run pnpm --filter growfit-api prisma:migrate deploy

# Poblar base de datos (opcional)
railway run pnpm --filter growfit-api prisma:seed
```

---

## 🔄 CI/CD Automático

### Vercel

✅ **Auto-deploy** cuando haces push a:
- `main` → Producción
- Otras ramas → Preview deployments

### Railway

✅ **Auto-deploy** cuando haces push a `main`

Configurar en **Settings → Service → Deploy**:
- **Watch Paths:** `apps/api/**`, `packages/shared/**`
- **Auto Deploy:** Enabled

---

## 📊 Monitoreo

### Vercel
- Dashboard: https://vercel.com/dashboard
- Analytics: Automático
- Logs: En tiempo real

### Railway
- Dashboard: https://railway.app/dashboard
- Logs: En tiempo real
- Métricas: CPU, RAM, Network

---

## 🐛 Troubleshooting

### Error: "Module not found" en Railway

**Solución:** Asegúrate de que el build command incluye:
```bash
pnpm install && pnpm --filter growfit-shared build && pnpm --filter growfit-api build
```

### Error: "Prisma Client not generated"

**Solución:** Añade al build command:
```bash
cd apps/api && pnpm prisma:generate
```

### Error: CORS en producción

**Solución:** Verifica que `CORS_ORIGIN` en Railway apunte a tu dominio de Vercel:
```env
CORS_ORIGIN=https://tu-app.vercel.app
```

### Error: Database connection

**Solución:** Verifica que `DATABASE_URL` en Railway esté correctamente configurado:
```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

---

## 🎯 Checklist de Despliegue

### Antes de desplegar:

- [ ] Código pusheado a GitHub/GitLab
- [ ] `.env.example` actualizado
- [ ] `README.md` actualizado
- [ ] Tests pasando
- [ ] Build local funciona: `pnpm build`

### Vercel (Client):

- [ ] Proyecto creado en Vercel
- [ ] Root directory: `apps/client`
- [ ] Build command configurado
- [ ] Variable `NEXT_PUBLIC_API_URL` configurada
- [ ] Dominio personalizado (opcional)

### Railway (API):

- [ ] Proyecto creado en Railway
- [ ] PostgreSQL agregado
- [ ] Variables de entorno configuradas
- [ ] Build command configurado
- [ ] Migraciones ejecutadas
- [ ] Dominio público generado
- [ ] Base de datos poblada (opcional)

### Final:

- [ ] Client puede comunicarse con API
- [ ] CORS configurado correctamente
- [ ] SSL/HTTPS habilitado
- [ ] Logs sin errores

---

## 📚 Recursos

- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Prisma Deploy](https://www.prisma.io/docs/guides/deployment)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## 🆘 Soporte

Si tienes problemas:
1. Revisa los logs en Vercel/Railway
2. Verifica las variables de entorno
3. Comprueba que el build funciona localmente
4. Consulta la documentación oficial
