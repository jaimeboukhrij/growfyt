# 🌐 Configuración Rápida de Dominios

## ✅ Configuración Actual

- **Dominio principal:** `growfyt.com` (Cloudflare)
- **Client (App):** `app.growfyt.com` → Vercel
- **API:** `api.growfyt.com` → Railway (opcional)

---

## 🎯 Pasos Rápidos

### 1️⃣ Configurar app.growfyt.com en Vercel

#### En Vercel:

1. Dashboard → Tu Proyecto → Settings → Domains
2. Add Domain: `app.growfyt.com`
3. Copiar el target mostrado (usualmente `cname.vercel-dns.com`)

#### En Cloudflare:

1. Dashboard → `growfyt.com` → DNS → Records
2. Add record:
   ```
   Type: CNAME
   Name: app
   Target: cname.vercel-dns.com
   Proxy status: ☁️ Proxied (ON)
   TTL: Auto
   ```
3. Save

#### Esperar:

- 1-5 minutos para verificación
- Vercel mostrará ✅ cuando esté listo

---

### 2️⃣ Configurar api.growfyt.com en Railway (Opcional)

#### En Railway:

1. Tu Servicio API → Settings → Networking
2. Custom Domain → Add Domain: `api.growfyt.com`
3. Copiar el CNAME target

#### En Cloudflare:

1. DNS → Records → Add record:
   ```
   Type: CNAME
   Name: api
   Target: [el target que Railway te dio]
   Proxy status: ☁️ Proxied (ON)
   TTL: Auto
   ```
2. Save

---

### 3️⃣ Actualizar Variables de Entorno

#### En Vercel (Client):

```env
NEXT_PUBLIC_API_URL=https://api.growfyt.com
```

O si no usas dominio personalizado para API:

```env
NEXT_PUBLIC_API_URL=https://tu-api.up.railway.app
```

#### En Railway (API):

```env
CORS_ORIGIN=https://app.growfyt.com
```

**Nota:** Los cambios de variables requieren redeploy automático.

---

### 4️⃣ Configurar SSL en Cloudflare

1. SSL/TLS → Overview
2. Encryption mode: **Full (strict)**
3. Always Use HTTPS: **ON**
4. Minimum TLS Version: **1.2**

---

## 🔍 Verificar Configuración

### Usando Terminal:

```bash
# Verificar DNS de app
dig app.growfyt.com +short

# Verificar DNS de api
dig api.growfyt.com +short

# Verificar SSL
curl -I https://app.growfyt.com

# Verificar API
curl https://api.growfyt.com/api/health
```

### Usando Navegador:

1. Abrir: https://app.growfyt.com
2. Verificar candado 🔒 SSL
3. Abrir DevTools → Network → Verificar llamadas a API

---

## 🐛 Problemas Comunes

### ❌ "Domain not verified" en Vercel

**Solución:**

```bash
# Verificar que el DNS esté propagado
nslookup app.growfyt.com

# Esperar 5-10 minutos más
# Verificar en: https://dnschecker.org
```

### ❌ "Too many redirects"

**Solución:**

- Cloudflare SSL/TLS mode → **Full (strict)**
- Esperar 1-2 minutos

### ❌ CORS Error

**Solución:**

- Verificar `CORS_ORIGIN` en Railway: `https://app.growfyt.com`
- Redeploy API si es necesario

### ❌ "Invalid Host Header" (Next.js)

**Solución:**

- Vercel lo maneja automáticamente
- No requiere configuración adicional

---

## 📊 Estado de Propagación DNS

Verificar en tiempo real:

- https://dnschecker.org
- https://www.whatsmydns.net

Buscar: `app.growfyt.com`

---

## 🎨 Configuración Adicional de Cloudflare

### Performance:

- **Auto Minify:** HTML, CSS, JS → ON
- **Brotli:** ON
- **HTTP/2:** ON
- **HTTP/3 (QUIC):** ON

### Security:

- **Security Level:** Medium
- **Bot Fight Mode:** ON
- **Challenge Passage:** 30 min

### Caching:

- **Browser Cache TTL:** 4 hours
- **Always Online:** ON
- **Development Mode:** OFF (producción)

---

## 📝 Resumen de Registros DNS

| Subdominio | Type  | Target                 | Proxy | Uso      |
| ---------- | ----- | ---------------------- | ----- | -------- |
| `app`      | CNAME | `cname.vercel-dns.com` | ☁️ ON | Client   |
| `api`      | CNAME | `railway-target`       | ☁️ ON | API      |
| `www`      | CNAME | `growfyt.com`          | ☁️ ON | Redirect |

---

## ✅ Checklist Final

### Vercel:

- [ ] Dominio `app.growfyt.com` agregado
- [ ] Dominio verificado (✅)
- [ ] SSL activo (🔒)
- [ ] Variable `NEXT_PUBLIC_API_URL` configurada

### Railway:

- [ ] Dominio `api.growfyt.com` agregado (opcional)
- [ ] Variable `CORS_ORIGIN` actualizada
- [ ] API respondiendo en el dominio

### Cloudflare:

- [ ] CNAME para `app` configurado
- [ ] CNAME para `api` configurado (opcional)
- [ ] SSL mode: Full (strict)
- [ ] Always Use HTTPS: ON

### Pruebas:

- [ ] `https://app.growfyt.com` carga correctamente
- [ ] SSL funciona (🔒)
- [ ] API responde desde el client
- [ ] No hay errores CORS

---

## 🆘 Enlaces Útiles

- [Vercel Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)
- [Railway Custom Domains](https://docs.railway.app/deploy/networking)
- [Cloudflare DNS](https://developers.cloudflare.com/dns/)
- [DNS Checker](https://dnschecker.org)

---

**¡Listo! Tu aplicación ahora debería estar accesible en `https://app.growfyt.com` 🚀**
