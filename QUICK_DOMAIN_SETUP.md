# 🚀 Configuración Rápida: app.growfyt.com

## Paso 1: Vercel Dashboard

1. Ve a: https://vercel.com/dashboard
2. Selecciona tu proyecto (growfit-client)
3. Click en **Settings** → **Domains**
4. Click en **Add Domain**
5. Escribe: `app.growfyt.com`
6. Click en **Add**

Vercel te mostrará algo como:

```
⏳ Waiting for DNS records to be configured

Please add the following DNS record to your domain:

Type: CNAME
Name: app
Value: cname.vercel-dns.com
```

## Paso 2: Cloudflare Dashboard

1. Ve a: https://dash.cloudflare.com
2. Click en tu dominio: **growfyt.com**
3. Ve a **DNS** → **Records**
4. Click en **Add record**
5. Llena:

```
Type: CNAME
Name: app
Target: cname.vercel-dns.com
Proxy status: ☁️ Proxied (naranja)
TTL: Auto
```

6. Click en **Save**

## Paso 3: Esperar Verificación

- Tiempo estimado: **1-5 minutos**
- Vuelve a Vercel
- Refresca la página
- Deberías ver: ✅ **app.growfyt.com** (verified)

## Paso 4: Verificar SSL

1. Ve a Cloudflare → **SSL/TLS** → **Overview**
2. Modo de encriptación: **Full (strict)**
3. **Always Use HTTPS**: Activado ✅

## Paso 5: Actualizar Variables de Entorno

### En Vercel:

1. **Settings** → **Environment Variables**
2. Editar o agregar:

```
Name: NEXT_PUBLIC_API_URL
Value: https://tu-api.up.railway.app
```

(O `https://api.growfyt.com` si configuraste dominio personalizado para API)

3. Click en **Save**
4. Vercel hará redeploy automáticamente

### En Railway (tu API):

1. Ve a tu servicio API
2. **Settings → Variables**
3. Editar o agregar:

```
Name: CORS_ORIGIN
Value: https://app.growfyt.com
```

4. **Settings → Deploy** - Configurar comandos:

**Root Directory:** `apps/api`

**Build Command:**
```bash
cd ../.. && pnpm install && pnpm --filter growfit-shared build && pnpm --filter growfit-api build && cd apps/api && pnpm prisma:generate
```

**Start Command:**
```bash
pnpm prisma:migrate deploy && node dist/apps/api/src/main.js
```

5. Railway redeployará automáticamente

## ✅ Verificar

1. Abre: https://app.growfyt.com
2. Debe cargar con **🔒 SSL**
3. Abre DevTools (F12) → Console
4. No debe haber errores CORS

## 🎉 ¡Listo!

Tu app está en: **https://app.growfyt.com**

---

## 🐛 Si algo no funciona:

### Problema: "Domain not verified"

**Solución:** Espera 5-10 minutos más. Verifica el CNAME en Cloudflare.

### Problema: "Too many redirects"

**Solución:** En Cloudflare → SSL/TLS → Mode → Cambiar a **Full (strict)**

### Problema: Errores CORS

**Solución:** Verifica que `CORS_ORIGIN=https://app.growfyt.com` en Railway

---

**¿Necesitas ayuda?** Revisa `DOMAIN_SETUP.md` para más detalles.
