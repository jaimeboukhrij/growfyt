# ✅ Checklist de Despliegue

## Pre-Despliegue

- [ ] Código funcionando localmente
- [ ] `pnpm build` ejecuta sin errores
- [ ] `pnpm start` funciona correctamente
- [ ] Tests pasando (si aplica)
- [ ] Variables de entorno documentadas en `.env.example`
- [ ] Commits pusheados a GitHub/GitLab

## Vercel (Client - Next.js)

### Configuración Inicial
- [ ] Cuenta creada en [vercel.com](https://vercel.com)
- [ ] Repositorio conectado
- [ ] Proyecto importado

### Configuración del Build
- [ ] **Framework Preset:** Next.js
- [ ] **Root Directory:** `apps/client`
- [ ] **Build Command:** `cd ../.. && pnpm install && pnpm --filter growfit-client build`
- [ ] **Output Directory:** `.next`
- [ ] **Install Command:** `pnpm install`

### Variables de Entorno
- [ ] `NEXT_PUBLIC_API_URL` configurada (URL del API en Railway)

### Verificación
- [ ] Deployment exitoso
- [ ] URL funciona correctamente
- [ ] Logs sin errores críticos
- [ ] Client puede conectarse al API

---

## Railway (API + PostgreSQL)

### Base de Datos
- [ ] Proyecto creado en [railway.app](https://railway.app)
- [ ] PostgreSQL agregado al proyecto
- [ ] `DATABASE_URL` copiada

### Configuración del API
- [ ] Servicio del API creado
- [ ] Repositorio conectado

### Variables de Entorno
- [ ] `NODE_ENV=production`
- [ ] `PORT=${{PORT}}`
- [ ] `DATABASE_URL=${{Postgres.DATABASE_URL}}`
- [ ] `CORS_ORIGIN` configurado con URL de Vercel

### Build Configuration
- [ ] **Root Directory:** `/` (raíz del monorepo)
- [ ] **Build Command:** `pnpm install && pnpm --filter growfit-shared build && pnpm --filter growfit-api build && cd apps/api && pnpm prisma:generate`
- [ ] **Start Command:** `cd apps/api && node dist/apps/api/src/main.js`

### Migraciones
- [ ] Migraciones ejecutadas: `railway run pnpm --filter growfit-api prisma:migrate deploy`
- [ ] Base de datos poblada (opcional): `railway run pnpm --filter growfit-api prisma:seed`

### Verificación
- [ ] Deployment exitoso
- [ ] URL pública generada
- [ ] Logs sin errores
- [ ] Endpoints responden correctamente
- [ ] Database conectada

---

## Post-Despliegue

### Integración
- [ ] `NEXT_PUBLIC_API_URL` en Vercel actualizada con URL de Railway
- [ ] `CORS_ORIGIN` en Railway actualizada con URL de Vercel
- [ ] Ambos servicios re-desplegados

### Testing en Producción
- [ ] Homepage carga correctamente
- [ ] API responde en `/api/health`
- [ ] CORS funciona correctamente
- [ ] No hay errores en consola del navegador
- [ ] Datos se cargan desde el API

### Dominios (Opcional)
- [ ] Dominio personalizado configurado en Vercel
- [ ] Dominio personalizado configurado en Railway
- [ ] DNS propagado
- [ ] SSL/HTTPS funcionando

---

## Monitoreo

- [ ] Logs de Vercel revisados
- [ ] Logs de Railway revisados
- [ ] Analytics configurado (opcional)
- [ ] Alertas configuradas (opcional)

---

## Comandos Útiles

```bash
# Preparar para despliegue (verifica todo)
pnpm prepare-deploy

# Build local
pnpm build

# Railway CLI - Ejecutar migraciones
railway run pnpm --filter growfit-api prisma:migrate deploy

# Railway CLI - Poblar base de datos
railway run pnpm --filter growfit-api prisma:seed

# Railway CLI - Ver logs
railway logs

# Vercel CLI - Desplegar
vercel --prod
```

---

## Troubleshooting

### ❌ Build falla en Vercel
**Solución:** Verifica que el build command incluya la instalación desde la raíz del monorepo

### ❌ Module not found en Railway
**Solución:** Asegúrate de construir `growfit-shared` antes que `growfit-api`

### ❌ CORS error
**Solución:** Verifica que `CORS_ORIGIN` en Railway coincida con tu URL de Vercel

### ❌ Database connection failed
**Solución:** Verifica que `DATABASE_URL` esté correctamente configurada como `${{Postgres.DATABASE_URL}}`

### ❌ 502 Bad Gateway en Railway
**Solución:** Revisa los logs para ver si el servidor está escuchando en el puerto correcto (`${{PORT}}`)

---

## 🎉 ¡Listo!

Una vez completados todos los pasos, tu aplicación estará:
- ✅ Desplegada en producción
- ✅ Con SSL/HTTPS
- ✅ Con auto-deploy habilitado
- ✅ Monitoreada y lista para usar

Para más detalles, consulta: [DEPLOYMENT.md](./DEPLOYMENT.md)
