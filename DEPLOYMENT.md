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
3. Railway detectará automáticamente que es un proyecto Node.js

4. **Configurar variables de entorno en Settings → Variables:**

```bash
NODE_ENV=production
DATABASE_URL=${{Postgres.DATABASE_URL}}
CORS_ORIGIN=https://app.growfyt.com
```

5. **Configurar Build y Deploy en Settings → Deploy:**

   **Root Directory:** `apps/api`
   
   **Build Command:**
   ```bash
   cd ../.. && pnpm install && pnpm --filter growfit-shared build && pnpm --filter growfit-api build && cd apps/api && pnpm prisma:generate
   ```
   
   **Start Command:**
   ```bash
   pnpm prisma:migrate deploy && node dist/apps/api/src/main.js
   ```

   **Watch Paths:** (opcional, para deployments automáticos)
   ```
   apps/api/**
   packages/shared/**
   ```

⚠️ **Nota:** Railway asigna automáticamente el puerto con la variable `PORT`. No necesitas configurarla manualmente.

### Paso 4: Configurar Dominio

1. En el servicio del API, ve a **"Settings"**
2. En **"Domains"**, genera un dominio público
3. Copia la URL (ej: `https://tu-api.up.railway.app`)
4. Actualiza `NEXT_PUBLIC_API_URL` en Vercel con esta URL

---

## 🌍 Configurar Dominio Personalizado (Cloudflare + Vercel)

### Client: app.growfyt.com

#### Paso 1: Agregar Dominio en Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Click en tu proyecto del Client
3. Ve a **Settings → Domains**
4. Click en **"Add Domain"**
5. Escribe: `app.growfyt.com`
6. Click en **"Add"**

Vercel te mostrará los registros DNS que necesitas configurar.

#### Paso 2: Configurar DNS en Cloudflare

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Selecciona tu dominio **growfyt.com**
3. Ve a **DNS → Records**
4. Click en **"Add record"**

**Agregar registro CNAME:**

```
Type: CNAME
Name: app
Target: cname.vercel-dns.com
Proxy status: Proxied (nube naranja) o DNS only
TTL: Auto
```

5. Click en **"Save"**

#### Paso 3: Verificar en Vercel

1. Vuelve a Vercel
2. En **Settings → Domains**, deberías ver `app.growfyt.com`
3. Espera unos minutos (la verificación puede tardar 1-5 minutos)
4. Una vez verificado, verás un ✅ verde

#### Paso 4: Configurar SSL (Automático)

- Vercel configurará automáticamente el certificado SSL
- Si usas Cloudflare en modo "Proxied", asegúrate de:
  - En Cloudflare: **SSL/TLS → Overview → Full** o **Full (strict)**

### API: api.growfyt.com (Opcional)

Si quieres usar un subdominio para tu API en Railway:

#### En Cloudflare:

```
Type: CNAME
Name: api
Target: tu-servicio.up.railway.app
Proxy status: Proxied
TTL: Auto
```

#### En Railway:

1. Ve a tu servicio de API
2. **Settings → Networking → Custom Domain**
3. Agrega: `api.growfyt.com`
4. Railway te dará instrucciones de verificación

---

## 🔄 Actualizar Variables de Entorno después del Dominio

### En Vercel (Client)

Actualiza la variable de entorno:

```env
# Si tu API está en Railway con dominio personalizado
NEXT_PUBLIC_API_URL=https://api.growfyt.com

# O si usas el dominio de Railway
NEXT_PUBLIC_API_URL=https://tu-api.up.railway.app
```

### En Railway (API)

Actualiza CORS_ORIGIN:

```env
CORS_ORIGIN=https://app.growfyt.com
```

**Después de actualizar:**

1. En Vercel: Redeploy automático
2. En Railway: Redeploy automático

---

## ✅ Verificación Final

### Checklist de Dominio:

- [ ] `app.growfyt.com` agregado en Vercel
- [ ] Registro CNAME en Cloudflare configurado
- [ ] SSL activo (candado 🔒 en el navegador)
- [ ] Dominio verificado en Vercel (✅)
- [ ] `CORS_ORIGIN` actualizado en Railway
- [ ] `NEXT_PUBLIC_API_URL` actualizado en Vercel
- [ ] Aplicación accesible en `https://app.growfyt.com`

### Probar la configuración:

```bash
# Verificar que el dominio apunta correctamente
dig app.growfyt.com

# O con nslookup
nslookup app.growfyt.com

# Probar en el navegador
open https://app.growfyt.com
```

---

## 🐛 Troubleshooting Dominios

### Error: "Domain not verified"

**Causa:** DNS no propagado o mal configurado

**Solución:**

1. Verifica el registro CNAME en Cloudflare
2. Espera 5-10 minutos para propagación
3. Usa [DNS Checker](https://dnschecker.org) para verificar

### Error: "Too many redirects"

**Causa:** Configuración SSL incorrecta en Cloudflare

**Solución:**

1. En Cloudflare: **SSL/TLS → Overview**
2. Cambiar a **"Full"** o **"Full (strict)"**
3. Esperar 1-2 minutos

### Error: "Invalid Host header"

**Causa:** Next.js no reconoce el dominio

**Solución:**
En `next.config.js`, no necesitas hacer nada. Vercel lo maneja automáticamente.

### API CORS Error después de cambiar dominio

**Causa:** `CORS_ORIGIN` no actualizado

**Solución:**

1. Ve a Railway → Variables de entorno
2. Actualiza: `CORS_ORIGIN=https://app.growfyt.com`
3. Railway redeployará automáticamente

---

## 🎯 Resumen de Dominios

| Servicio  | Dominio                         | Plataforma |
| --------- | ------------------------------- | ---------- |
| Client    | `app.growfyt.com`               | Vercel     |
| API       | `api.growfyt.com` o Railway URL | Railway    |
| Principal | `growfyt.com`                   | (Opcional) |

---

## 🔐 Configuración de Cloudflare Recomendada

### Para mejor seguridad y rendimiento:

1. **SSL/TLS:**

   - Mode: Full (strict)
   - Always Use HTTPS: On
   - Minimum TLS Version: 1.2

2. **Speed:**

   - Auto Minify: HTML, CSS, JS
   - Brotli: On
   - HTTP/2: On

3. **Caching:**

   - Browser Cache TTL: 4 hours
   - Development Mode: Off (en producción)

4. **Firewall:**
   - Security Level: Medium
   - Challenge Passage: 30 minutes

---
