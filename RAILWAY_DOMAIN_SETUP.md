# 🚂 Configuración de Dominio en Railway

## Paso 1: Obtener el CNAME de Railway

1. **Accede a Railway:** https://railway.app
2. **Selecciona tu proyecto** → Click en el servicio **API**
3. **Settings** → **Networking** → **Custom Domain**
4. **Add Domain:** `api.growfyt.com`
5. **Copia el CNAME target** que Railway te muestra
   - Ejemplo: `growfit-api-production.up.railway.app`

---

## Paso 2: Configurar DNS en Cloudflare

### En Cloudflare Dashboard:

1. Accede a: https://dash.cloudflare.com
2. Selecciona tu dominio: **growfyt.com**
3. Ve a **DNS** → **Records**
4. Click en **Add record**

### Configuración del Registro CNAME:

```
Type: CNAME
Name: api
Target: [el-target-que-te-dio-railway].up.railway.app
Proxy status: ☁️ Proxied (Naranja/ON)
TTL: Auto
```

**Importante:** Asegúrate de que el proxy esté **activado** (naranja/ON)

5. Click en **Save**

---

## Paso 3: Verificar en Railway

1. Vuelve a Railway → Settings → Networking
2. Railway verificará automáticamente el DNS
3. Espera **1-5 minutos**
4. Deberías ver **✅ Connected** junto a `api.growfyt.com`

---

## Paso 4: Configurar SSL en Cloudflare

### Para HTTPS correcto:

1. **SSL/TLS** → **Overview**
2. Encryption mode: **Full (strict)**
3. **Edge Certificates** → Always Use HTTPS: **ON**
4. Minimum TLS Version: **TLS 1.2**

---

## Paso 5: Actualizar Variables de Entorno

### En Railway (API):

Añade/actualiza esta variable:

```env
CORS_ORIGIN=https://app.growfyt.com
```

Para añadir la variable:

1. **Variables** tab en Railway
2. **New Variable**
3. Name: `CORS_ORIGIN`
4. Value: `https://app.growfyt.com`
5. **Add** → Railway redeployará automáticamente

### En Vercel (Client):

Actualiza:

```env
NEXT_PUBLIC_API_URL=https://api.growfyt.com
```

1. Dashboard de Vercel → Tu proyecto
2. **Settings** → **Environment Variables**
3. Edita `NEXT_PUBLIC_API_URL`
4. Value: `https://api.growfyt.com`
5. **Save** → Redeploy el client

---

## 🧪 Verificar que Funciona

### Usando Terminal:

```bash
# Verificar DNS
dig api.growfyt.com +short

# Debería mostrar IPs de Cloudflare o el CNAME de Railway

# Probar la API
curl https://api.growfyt.com/api/health

# Debería devolver: {"status":"ok"}
```

### Usando Navegador:

1. Abre: https://api.growfyt.com/api/health
2. Deberías ver: `{"status":"ok"}`
3. Verifica el candado 🔒 (SSL válido)

---

## 🐛 Problemas Comunes

### ❌ "Domain not verified"

**Solución:**

- Verifica que el CNAME en Cloudflare esté correcto
- Espera 5-10 minutos más para propagación DNS
- Verifica en: https://dnschecker.org/#CNAME/api.growfyt.com

### ❌ "Too many redirects"

**Solución:**

- Cloudflare SSL mode → **Full (strict)**
- No uses "Flexible"

### ❌ "Certificate error"

**Solución:**

- Espera 1-2 minutos para que Railway genere el certificado SSL
- Verifica que el proxy de Cloudflare esté **ON** (naranja)

### ❌ CORS Error desde el Client

**Solución:**

```bash
# Verifica la variable CORS_ORIGIN en Railway
CORS_ORIGIN=https://app.growfyt.com

# NO uses http:// ni incluyas /api al final
# CORRECTO: https://app.growfyt.com
# INCORRECTO: http://app.growfyt.com/api
```

---

## 📊 Estado Actual

### Dominios configurados:

| Dominio           | Servicio | Plataforma | Estado       |
| ----------------- | -------- | ---------- | ------------ |
| `app.growfyt.com` | Client   | Vercel     | ✅           |
| `api.growfyt.com` | API      | Railway    | ⏳ Pendiente |

---

## 🎯 Checklist

- [ ] Railway: Custom domain `api.growfyt.com` añadido
- [ ] Railway: CNAME target copiado
- [ ] Cloudflare: Registro CNAME creado
- [ ] Cloudflare: Proxy activado (naranja)
- [ ] Cloudflare: SSL mode = Full (strict)
- [ ] Railway: Dominio verificado ✅
- [ ] Railway: Variable `CORS_ORIGIN` configurada
- [ ] Vercel: Variable `NEXT_PUBLIC_API_URL` actualizada
- [ ] Prueba: `curl https://api.growfyt.com/api/health` funciona
- [ ] Prueba: Client puede llamar a la API sin errores CORS

---

## 📸 Capturas de Referencia

### Railway - Custom Domain:

```
Settings → Networking → Custom Domain
┌─────────────────────────────────────────┐
│ Custom Domains                          │
│ ┌─────────────────────────────────────┐ │
│ │ api.growfyt.com              [✅]   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ CNAME Target:                           │
│ growfit-api-production.up.railway.app   │
└─────────────────────────────────────────┘
```

### Cloudflare - DNS Record:

```
Type    Name    Content                                 Proxy  TTL
CNAME   api     growfit-api-production.up.railway.app   ☁️     Auto
```

---

## 🆘 Enlaces Útiles

- [Railway Custom Domains](https://docs.railway.app/deploy/networking)
- [Cloudflare DNS Management](https://developers.cloudflare.com/dns/)
- [DNS Checker](https://dnschecker.org)
- [SSL Checker](https://www.sslshopper.com/ssl-checker.html)

---

**¡Una vez completado, tu API estará disponible en `https://api.growfyt.com`! 🚀**
