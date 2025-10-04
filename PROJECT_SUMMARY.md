# 📘 Resumen de Configuración - GrowFit

## 🌐 URLs de Producción

| Servicio      | URL                     | Plataforma         | Estado |
| ------------- | ----------------------- | ------------------ | ------ |
| **Client**    | https://app.growfyt.com | Vercel             | ✅     |
| **API**       | https://api.growfyt.com | Railway            | ⏳     |
| **Database**  | Internal                | Railway PostgreSQL | ✅     |
| **Sitio Web** | https://growfyt.com     | Cloudflare         | 📋     |

---

## 🔧 Comandos Rápidos

```bash
# Desarrollo local
pnpm dev

# Build para producción
pnpm build

# Iniciar en modo producción (local)
pnpm start

# Verificar dominios después del despliegue
pnpm verify-domains

# Preparar para despliegue
pnpm prepare-deploy
```

---

## 📁 Archivos de Configuración Importantes

| Archivo                   | Propósito                                       |
| ------------------------- | ----------------------------------------------- |
| `QUICK_DOMAIN_SETUP.md`   | Guía rápida para configurar app.growfyt.com     |
| `DOMAIN_SETUP.md`         | Guía detallada de configuración de dominios     |
| `DEPLOYMENT.md`           | Guía completa de despliegue en Vercel + Railway |
| `DEPLOYMENT_CHECKLIST.md` | Checklist de despliegue                         |
| `README.md`               | Documentación principal del proyecto            |

---

## 🔑 Variables de Entorno Necesarias

### Client (Vercel)

```env
NEXT_PUBLIC_API_URL=https://api.growfyt.com
# O la URL de Railway: https://tu-api.up.railway.app
```

### API (Railway)

```env
NODE_ENV=production
PORT=${{PORT}}
DATABASE_URL=${{Postgres.DATABASE_URL}}
CORS_ORIGIN=https://app.growfyt.com
```

---

## 📊 Configuración DNS en Cloudflare

### Para app.growfyt.com (Client)

```
Type: CNAME
Name: app
Target: cname.vercel-dns.com
Proxy: ☁️ ON (Proxied)
TTL: Auto
```

### Para api.growfyt.com (API - Opcional)

```
Type: CNAME
Name: api
Target: [Railway target URL]
Proxy: ☁️ ON (Proxied)
TTL: Auto
```

### Configuración SSL en Cloudflare

- **Mode:** Full (strict)
- **Always Use HTTPS:** ON
- **Minimum TLS Version:** 1.2

---

## 🚀 Pasos para Desplegar desde Cero

### 1. Preparar el Código

```bash
# Asegurarte de que todo funciona localmente
pnpm install
pnpm build
pnpm start

# Pushear a GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Desplegar Client en Vercel

1. Ir a [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Import Project** → Seleccionar repositorio
3. **Configure Project:**
   - Root Directory: `apps/client`
   - Build Command: `cd ../.. && pnpm install && pnpm --filter growfit-client build`
   - Output Directory: `.next`
4. **Add Environment Variable:**
   - `NEXT_PUBLIC_API_URL` = Tu API URL
5. **Deploy**

### 3. Configurar Dominio en Vercel

1. **Settings** → **Domains**
2. **Add Domain:** `app.growfyt.com`
3. Configurar CNAME en Cloudflare (ver arriba)
4. Esperar verificación (1-5 min)

### 4. Desplegar API en Railway

1. Ir a [railway.app/dashboard](https://railway.app/dashboard)
2. **New Project** → **Deploy from GitHub repo**
3. **Add PostgreSQL** database
4. **Configure Service:**
   - Build Command: `pnpm install && pnpm --filter growfit-shared build && pnpm --filter growfit-api build && cd apps/api && pnpm prisma:generate`
   - Start Command: `cd apps/api && pnpm prisma:migrate deploy && node dist/apps/api/src/main.js`
5. **Add Environment Variables** (ver arriba)
6. **Deploy**

### 5. Configurar Dominio en Railway (Opcional)

1. **Settings** → **Networking** → **Custom Domain**
2. Add: `api.growfyt.com`
3. Configurar CNAME en Cloudflare
4. Esperar verificación

### 6. Verificar Todo

```bash
# Ejecutar script de verificación
pnpm verify-domains

# O manualmente:
curl https://app.growfyt.com
curl https://api.growfyt.com/api/health
```

---

## 🐛 Troubleshooting Común

### ❌ Client no carga

**Verificar:**

1. DNS configurado en Cloudflare
2. Dominio verificado en Vercel (✅)
3. SSL en modo "Full (strict)"

**Solución:**

```bash
# Verificar DNS
dig app.growfyt.com +short

# Esperar propagación (5-10 min)
# Verificar en: https://dnschecker.org
```

### ❌ Errores CORS

**Causa:** `CORS_ORIGIN` no configurado correctamente

**Solución:**

1. Railway → Variables → `CORS_ORIGIN=https://app.growfyt.com`
2. Guardar (redeploy automático)

### ❌ API no responde

**Verificar:**

1. Railway → Logs (errores)
2. Database conectada
3. Migraciones ejecutadas

**Solución:**

```bash
# Ejecutar migraciones manualmente (Railway CLI)
railway run pnpm --filter growfit-api prisma:migrate deploy
```

### ❌ "Too many redirects"

**Causa:** SSL mal configurado en Cloudflare

**Solución:**

1. Cloudflare → SSL/TLS → Overview
2. Mode: **Full (strict)**
3. Esperar 1-2 minutos

---

## 📞 Contactos y Enlaces

### Plataformas

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Railway Dashboard](https://railway.app/dashboard)
- [Cloudflare Dashboard](https://dash.cloudflare.com)

### Herramientas de Verificación

- [DNS Checker](https://dnschecker.org)
- [What's My DNS](https://www.whatsmydns.net)
- [SSL Checker](https://www.ssllabs.com/ssltest/)

### Documentación

- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Cloudflare Docs](https://developers.cloudflare.com)

---

## ✅ Estado Actual del Proyecto

- ✅ **Monorepo configurado** (Turborepo + pnpm)
- ✅ **Client** (Next.js 15 + Tailwind CSS)
- ✅ **API** (NestJS 11 + Prisma + PostgreSQL)
- ✅ **Database** (PostgreSQL en Docker local)
- ✅ **Scripts de despliegue** configurados
- ✅ **Documentación** completa
- ⏳ **Despliegue en producción** (en progreso)

---

**Última actualización:** 4 de octubre de 2025

**Equipo:** GrowFit Dev Team

**Repositorio:** [Tu repositorio en GitHub]
