# 🐛 Diagnóstico Error 502 - Railway

## ❌ Problema
Error 502 Bad Gateway en `api.growfyt.com` - Cloudflare no puede conectar con Railway

## 🔍 Causas Comunes

### 1. **El servidor no está iniciando**
- Build falló
- Error en las migrations de Prisma
- Puerto incorrecto

### 2. **Variables de entorno faltantes**
- `DATABASE_URL` no configurada
- `PORT` (Railway la proporciona automáticamente)

### 3. **El servidor no escucha en 0.0.0.0**
- Debe escuchar en todas las interfaces, no solo localhost

---

## ✅ Soluciones Aplicadas

### 1. **Actualizado `main.ts`**
```typescript
// ANTES (❌ Incorrecto)
await app.listen(port);

// AHORA (✅ Correcto)
await app.listen(port, '0.0.0.0');
```

### 2. **Puerto dinámico**
```typescript
// Railway proporciona PORT automáticamente
const port = process.env.PORT || 3001;
```

### 3. **Logs mejorados**
Ahora muestra:
- Environment (production/development)
- Puerto usado
- CORS origin configurado

---

## 🔧 Pasos para Resolver

### Paso 1: Verificar Variables en Railway

**Variables REQUERIDAS:**
```env
DATABASE_URL=postgresql://user:password@host:port/database
NODE_ENV=production
CORS_ORIGIN=https://app.growfyt.com
```

**Para verificar:**
1. Railway → Tu servicio API → **Variables** tab
2. Asegúrate de que `DATABASE_URL` esté configurada
3. Añade `CORS_ORIGIN` si no existe

### Paso 2: Verificar el Build

1. Railway → **Deployments** tab
2. Click en el deployment más reciente
3. Busca errores en la fase de **Build**

**Comandos que deben ejecutarse:**
```bash
✅ pnpm install --frozen-lockfile
✅ pnpm --filter growfit-shared build
✅ pnpm --filter growfit-api build
✅ cd apps/api && pnpm prisma:generate
```

### Paso 3: Verificar el Start

1. En los logs, busca la fase **Start**
2. Debe mostrar:
```bash
✅ prisma migrate deploy
✅ Starting Nest application...
✅ Nest application successfully started
✅ 🚀 Growfit API running on https://api.growfyt.com
```

### Paso 4: Verificar Errores Comunes

#### Error de Prisma:
```bash
❌ Error: P1001: Can't reach database server
```
**Solución:** `DATABASE_URL` incorrecta o base de datos no accesible

#### Error de Módulo:
```bash
❌ Cannot find module 'growfit-shared'
```
**Solución:** Build de shared falló, verificar logs de build

#### Error de Puerto:
```bash
❌ EADDRINUSE: address already in use
```
**Solución:** No debería pasar en Railway (reinicia el deployment)

---

## 📋 Checklist de Verificación

### En Railway:

- [ ] Deployment completado (no en "Building" o "Starting")
- [ ] Estado del servicio: **Active** (no "Crashed" o "Failed")
- [ ] Logs muestran: "Nest application successfully started"
- [ ] Variable `DATABASE_URL` configurada
- [ ] Variable `CORS_ORIGIN` configurada
- [ ] El deployment no muestra errores rojos

### En Cloudflare:

- [ ] CNAME record para `api` existe
- [ ] CNAME apunta al target correcto de Railway
- [ ] Proxy está **activado** (naranja/ON)
- [ ] SSL mode: **Full (strict)**

### DNS:

- [ ] `dig api.growfyt.com +short` devuelve IPs de Cloudflare
- [ ] Propagación DNS completa (https://dnschecker.org)

---

## 🧪 Tests para Ejecutar

### 1. Probar Railway URL directa:

```bash
# Encuentra tu Railway URL en: Settings → Networking → Public Networking
# Ejemplo: https://growfit-api-production.up.railway.app

curl https://TU-RAILWAY-URL.up.railway.app/api/health
```

**Resultado esperado:**
```json
{"status":"ok"}
```

**Si falla:** El problema está en Railway (no en Cloudflare/DNS)

### 2. Probar con custom domain:

```bash
curl https://api.growfyt.com/api/health
```

**Si la Railway URL funciona pero el custom domain no:**
- Problema de DNS/Cloudflare
- Verifica CNAME en Cloudflare

**Si ambos fallan:**
- Problema en Railway (servidor no inició correctamente)

---

## 🔴 Pasos de Emergencia

### Si nada funciona, hacer rollback:

1. **En Railway:**
   - Deployments → Click en un deployment anterior que funcionaba
   - Click en "⋯" (tres puntos) → **Redeploy**

### Si es la primera vez desplegando:

1. **Verificar logs completos:**
   ```bash
   # En Railway → View logs → Copiar TODO
   ```

2. **Verificar que el build local funcione:**
   ```bash
   cd /Users/jaime.boukhrij/Desktop/growfyt/desarrollo/growfit
   rm -rf dist node_modules apps/*/node_modules packages/*/node_modules
   pnpm install
   pnpm --filter growfit-shared build
   pnpm --filter growfit-api build
   cd apps/api && pnpm start:prod
   ```

3. **Si funciona local pero no en Railway:**
   - Problema con `nixpacks.toml` o variables de entorno

---

## 📸 Qué compartir si el problema persiste

1. **Screenshot de Railway Deployments** (muestra el estado)
2. **Logs completos** del deployment fallido (toda la salida)
3. **Variables de entorno** (oculta las passwords, pero muestra los nombres)
4. **Railway Settings → Networking** (screenshot de la config de dominio)

---

## ✅ Siguiente Paso

**Commit y push de los cambios:**
```bash
cd /Users/jaime.boukhrij/Desktop/growfyt/desarrollo/growfit
git add -A
git commit -m "fix: configure server to listen on 0.0.0.0 for Railway"
git push origin main
```

Luego espera 2-3 minutos para que Railway redeploy automáticamente y vuelve a probar.

---

**💡 Tip:** Los logs de Railway son tu mejor amigo. Siempre revisa:
1. Build logs → Para errores de compilación
2. Deploy logs → Para errores de inicio del servidor
3. Application logs → Para errores en runtime
