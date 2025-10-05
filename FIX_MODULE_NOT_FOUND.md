# ✅ Solución: Error "Cannot find module 'growfit-shared'"

## 🐛 Problema Original

```bash
Error: Cannot find module '/app/apps/api/node_modules/growfit-shared/dist/index.js'
```

**Causa:**

- Ejecutar `node` desde `/app/apps/api/` hace que Node busque los módulos en `/app/apps/api/node_modules/`
- En un monorepo con pnpm, `growfit-shared` está en `/app/node_modules/` (raíz del monorepo)

---

## ✅ Solución Aplicada

### Cambio en `nixpacks.toml`:

**ANTES (❌ Incorrecto):**

```toml
[start]
cmd = 'cd apps/api && pnpm prisma:migrate deploy && pnpm start:prod'
```

**AHORA (✅ Correcto):**

```toml
[start]
cmd = 'cd apps/api && pnpm prisma:migrate deploy && cd ../.. && NODE_ENV=production node apps/api/dist/apps/api/src/main.js'
```

### ¿Por qué funciona?

1. **Ejecutamos Prisma migrations** desde `/app/apps/api/` (donde está `schema.prisma`)
2. **Volvemos a la raíz** con `cd ../..` → ahora estamos en `/app/`
3. **Ejecutamos Node** desde la raíz del monorepo
4. **Node encuentra los módulos** en `/app/node_modules/` (donde pnpm los instaló)

---

## 🧪 Verificación Local

```bash
# Desde la raíz del monorepo:
cd /Users/jaime.boukhrij/Desktop/growfyt/desarrollo/growfit

# Ejecutar como lo hace Railway:
NODE_ENV=production PORT=3001 node apps/api/dist/apps/api/src/main.js

# Resultado esperado:
# ✅ [Nest] Starting Nest application...
# ✅ Database connected
# ✅ Nest application successfully started
# ✅ 🚀 Growfit API running on https://api.growfyt.com
```

---

## 📋 Estructura del Monorepo

```
/app/                              ← Raíz del monorepo (ejecutar node aquí)
├── node_modules/
│   ├── growfit-shared/           ← El paquete está aquí!
│   ├── @nestjs/
│   └── ...
├── apps/
│   └── api/
│       ├── dist/
│       │   └── apps/api/src/
│       │       └── main.js       ← El archivo a ejecutar
│       ├── prisma/
│       │   └── schema.prisma     ← Migrations aquí
│       └── src/
└── packages/
    └── shared/
        └── dist/
```

---

## 🎯 Comando Final de Railway

```bash
# 1. Ir a apps/api para ejecutar migrations
cd apps/api

# 2. Aplicar migrations de Prisma
pnpm prisma:migrate deploy

# 3. Volver a la raíz del monorepo
cd ../..

# 4. Ejecutar el servidor desde la raíz (para que encuentre node_modules/)
NODE_ENV=production node apps/api/dist/apps/api/src/main.js
```

---

## 🚀 Resultado en Railway

Después de este fix, Railway debería:

1. ✅ **Build exitoso:**

   ```bash
   pnpm --filter growfit-shared build
   pnpm --filter growfit-api build
   cd apps/api && pnpm prisma:generate
   ```

2. ✅ **Start exitoso:**

   ```bash
   cd apps/api && pnpm prisma:migrate deploy
   # Migrations aplicadas

   cd ../..
   NODE_ENV=production node apps/api/dist/apps/api/src/main.js
   # Servidor iniciando...
   ```

3. ✅ **Logs esperados:**
   ```bash
   [Nest] Starting Nest application...
   [Nest] PrismaModule dependencies initialized
   [Nest] AppModule dependencies initialized
   [Nest] Nest application successfully started
   🚀 Growfit API running on https://api.growfyt.com
   📚 API endpoints: https://api.growfyt.com/api
   🌍 Environment: production
   🔌 Port: 8080 (o el que Railway asigne)
   ```

---

## 🔍 Cómo Verificar en Railway

### 1. Ver los Deployment Logs:

- Railway → Tu servicio API → **Deployments**
- Click en el deployment más reciente
- Busca estos mensajes:

```bash
✅ "Nest application successfully started"
✅ "🚀 Growfit API running on"
✅ "Database connected"
```

### 2. Probar el Endpoint:

```bash
# Usando la Railway URL directa:
curl https://tu-api.up.railway.app/api/health

# Usando tu dominio personalizado:
curl https://api.growfyt.com/api/health

# Resultado esperado:
{"status":"ok"}
```

### 3. Verificar el Estado:

- **Deployments:** Estado debe ser "Active" (verde)
- **Health Check:** Si lo tienes configurado, debe estar ✅
- **Logs:** No debe haber errores de "MODULE_NOT_FOUND"

---

## 🐛 Si Todavía Hay Errores

### Error: "Cannot find module '@nestjs/...'"

**Solución:** Reinstalar dependencias en Railway

```bash
# Forzar rebuild en Railway:
# Settings → Redeploy (o hacer un commit vacío)
git commit --allow-empty -m "trigger rebuild"
git push origin main
```

### Error: "Prisma Client not generated"

**Solución:** Verificar fase de build

```bash
# Debe ejecutarse en nixpacks.toml:
cd apps/api && pnpm prisma:generate
```

### Error: "Database connection failed"

**Solución:** Verificar `DATABASE_URL`

- Railway → Variables → `DATABASE_URL` debe estar configurada
- Formato: `postgresql://user:password@host:port/database`

---

## ✅ Checklist Final

- [x] `nixpacks.toml` actualizado para ejecutar desde raíz
- [x] `main.ts` configurado para escuchar en `0.0.0.0`
- [x] Cambios pusheados a GitHub
- [ ] Railway detectó el nuevo commit (espera 1-2 min)
- [ ] Deployment completado exitosamente
- [ ] API responde en la Railway URL
- [ ] API responde en el dominio personalizado `api.growfyt.com`

---

## 📊 Timeline de Solución

1. **Error inicial:** "Cannot find module growfit-shared"
2. **Causa identificada:** Ejecutar node desde subdirectorio
3. **Fix aplicado:** Ejecutar desde raíz del monorepo
4. **Verificación local:** ✅ Funciona
5. **Deployment:** Esperando a Railway...

---

**⏱️ Tiempo estimado:** Railway redeployará en 2-3 minutos

**🎯 Próximo paso:** Verificar los logs en Railway y confirmar que el API esté funcionando

---

## 🆘 Si Necesitas Ayuda

Comparte:

1. Screenshot del estado del deployment en Railway
2. Los últimos 50 líneas de los logs (especialmente la sección "Start")
3. Variables de entorno configuradas (oculta passwords)
