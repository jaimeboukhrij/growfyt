# ✅ SOLUCIÓN FINAL: Error "Cannot find module growfit-shared"

## 🎯 Problema Identificado

**Railway usa Procfile en lugar de nixpacks.toml cuando ambos existen.**

Los logs mostraron:
```
↳ Found web command in Procfile
Deploy: $ cd apps/api && node dist/apps/api/src/main.js
```

El Procfile tenía el comando incorrecto que no copiaba el paquete `growfit-shared`.

---

## ✅ Solución Aplicada

### Actualizado `Procfile`:

**ANTES (❌):**
```
web: cd apps/api && node dist/apps/api/src/main.js
```

**AHORA (✅):**
```
web: cd apps/api && pnpm prisma:migrate deploy && cd ../.. && cp -r packages/shared/dist apps/api/node_modules/growfit-shared/ && cp packages/shared/package.json apps/api/node_modules/growfit-shared/ && cd apps/api && node dist/apps/api/src/main.js
```

---

## 🔍 ¿Por Qué Funciona?

### El Problema Original:
1. pnpm crea un **symlink** en `apps/api/node_modules/growfit-shared` → `../../../packages/shared`
2. En Railway, cuando ejecutamos desde `apps/api/`, el symlink **funciona**
3. PERO el `dist/` del shared **NO estaba siendo copiado** porque:
   - El build solo hace `pnpm --filter growfit-shared build`
   - Esto crea `packages/shared/dist/` en el sistema de build
   - Pero cuando Railway crea la imagen de deployment, **no copia el dist/**

### La Solución:
1. **Copiar físicamente** `packages/shared/dist/` a `apps/api/node_modules/growfit-shared/dist/`
2. **Copiar** `packages/shared/package.json` a `apps/api/node_modules/growfit-shared/`
3. Ahora `apps/api/node_modules/growfit-shared/` tiene TODO lo necesario

---

## 📋 Comando del Procfile Explicado

```bash
# 1. Ir al directorio de la API
cd apps/api

# 2. Aplicar migrations de Prisma
pnpm prisma:migrate deploy

# 3. Volver a la raíz
cd ../..

# 4. Copiar el paquete shared compilado (con dist/)
cp -r packages/shared/dist apps/api/node_modules/growfit-shared/

# 5. Copiar el package.json del shared
cp packages/shared/package.json apps/api/node_modules/growfit-shared/

# 6. Ir a apps/api
cd apps/api

# 7. Iniciar el servidor
node dist/apps/api/src/main.js
```

---

## 🏗️ Estructura Resultante en Railway

```
/app/
├── packages/
│   └── shared/
│       ├── dist/           ← Build aquí
│       │   └── index.js
│       └── package.json
└── apps/
    └── api/
        ├── node_modules/
        │   └── growfit-shared/
        │       ├── dist/         ← COPIADO aquí! ✅
        │       │   └── index.js
        │       └── package.json  ← COPIADO aquí! ✅
        └── dist/
            └── apps/api/src/
                └── main.js       ← Se ejecuta desde aquí
```

---

## 🧪 Verificación

### En Railway Logs:

Deberías ver:
```bash
✅ pnpm prisma:migrate deploy
✅ (copiando archivos)
✅ [Nest] Starting Nest application...
✅ [Nest] Nest application successfully started
✅🚀 Growfit API running on https://api.growfyt.com
```

### Probar el API:

```bash
# Con Railway URL directa
curl https://tu-proyecto.up.railway.app/api/health

# Con dominio personalizado
curl https://api.growfyt.com/api/health

# Resultado esperado:
{"status":"ok"}
```

---

## 🎯 Diferencia Entre nixpacks.toml y Procfile

| Archivo | Prioridad | Cuándo usar |
|---------|-----------|-------------|
| `Procfile` | **ALTA** | Railway lo detecta automáticamente si existe |
| `nixpacks.toml` | Media | Solo si NO hay Procfile |
| `railway.toml` | Baja | Legacy, ya no recomendado |

**Conclusión:** Si tienes Procfile, Railway lo usará y ignorará nixpacks.toml

---

## 🐛 Por Qué Fallaban las Soluciones Anteriores

1. **Modificar nixpacks.toml** ❌
   - Railway ignoraba nixpacks.toml porque había un Procfile

2. **Ejecutar desde la raíz** ❌
   - El problema no era el directorio de ejecución
   - El problema era que `dist/` del shared no estaba en node_modules

3. **Usar NODE_PATH** ❌
   - No resolvía el problema real (falta de archivos)

4. **Copiar en nixpacks.toml** ❌
   - Los comandos nunca se ejecutaban (Railway usaba Procfile)

---

## ✅ Checklist Final

- [x] Procfile actualizado con comandos correctos
- [x] Cambios pusheados a GitHub
- [ ] Railway detecta el nuevo commit (espera 1-2 min)
- [ ] Deployment completa exitosamente
- [ ] Logs muestran "Nest application successfully started"
- [ ] API responde en `/api/health`
- [ ] Dominio personalizado funciona

---

## 🚀 Próximos Pasos

### 1. Monitorear el Deployment:

- Ve a Railway → Deployments
- Espera a que termine (2-3 minutos)
- Revisa los logs

### 2. Verificar que Funciona:

```bash
# Probar health check
curl https://api.growfyt.com/api/health

# Debería devolver:
{"status":"ok"}
```

### 3. Configurar Variables de Entorno (si falta):

En Railway → Variables:
```env
DATABASE_URL=postgresql://... (ya debe estar)
NODE_ENV=production
CORS_ORIGIN=https://app.growfyt.com
```

### 4. Configurar Dominio Personalizado:

Si aún no lo hiciste:
1. Railway → Settings → Networking → Custom Domain
2. Añadir: `api.growfyt.com`
3. Copiar el CNAME target
4. Ir a Cloudflare → DNS → Añadir registro CNAME

---

## 📊 Resumen de Archivos Modificados

```
/growfit/
├── Procfile                    ← ✅ ACTUALIZADO (solución final)
├── nixpacks.toml              ← ⚠️ Ignorado por Railway (hay Procfile)
├── apps/api/
│   ├── package.json           ← ✅ Correcto
│   ├── src/main.ts            ← ✅ Escucha en 0.0.0.0
│   └── tsconfig.json          ← ✅ Correcto
└── packages/shared/
    ├── package.json           ← ✅ Correcto (main: ./dist/index.js)
    └── src/index.ts           ← ✅ Correcto
```

---

## 💡 Lecciones Aprendidas

1. **Railway prioriza Procfile** sobre otros archivos de configuración
2. **pnpm workspace symlinks** pueden causar problemas en deployment
3. **Copiar físicamente** es más confiable que confiar en symlinks
4. **Siempre revisar logs de Railway** para ver qué comando se está ejecutando
5. **La fase de build puede ser diferente** de la fase de deployment

---

## 🆘 Si Aún No Funciona

Comparte:
1. **Screenshot completo** del deployment en Railway
2. **Logs completos** (desde Build hasta Deploy)
3. **Output del comando:** `curl -v https://api.growfyt.com/api/health`

---

**⏱️ Tiempo estimado de deployment:** 2-3 minutos

**🎉 Una vez que funcione:** Tu API estará lista para producción en `https://api.growfyt.com`
