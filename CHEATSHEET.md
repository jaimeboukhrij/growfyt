# ⚡ Turborepo + pnpm - Guía Rápida

## 🎯 Lo Esencial

```bash
# Instalar
pnpm install

# Desarrollo (TODO en paralelo)
pnpm dev

# Build (con caché)
pnpm build
```

## 📦 Workspaces

```
growfit-shared    # packages/shared
growfit-api       # apps/api  
growfit-client    # apps/client
```

## 🔥 Comandos más Usados

```bash
# Ejecutar en workspace específico
pnpm --filter <workspace> <comando>

# Ejemplos:
pnpm --filter growfit-api dev
pnpm --filter growfit-client build
pnpm --filter growfit-shared type-check

# Añadir dependencia
pnpm --filter growfit-api add express
pnpm --filter growfit-client add react-router-dom

# Añadir dev dependency
pnpm --filter growfit-api add -D @types/express

# Añadir a workspace raíz
pnpm add -D prettier -w
```

## ⚡ Turborepo Tips

```bash
# Build con caché
pnpm build           # Cachea resultados

# Forzar rebuild
pnpm build --force   # Ignora caché

# Ver qué se ejecuta
pnpm turbo run build --dry

# Limpiar caché
rm -rf .turbo
```

## 🎮 Modo Desarrollo

```bash
# TODO en paralelo (recomendado)
pnpm dev

# Por separado
pnpm --filter growfit-api dev     # Terminal 1
pnpm --filter growfit-client dev  # Terminal 2
```

## 🔧 Mantenimiento

```bash
# Actualizar dependencias
pnpm update

# Ver desactualizados
pnpm outdated

# Reinstalar desde cero
rm -rf node_modules pnpm-lock.yaml .turbo
pnpm install
```

## 🚀 Velocidad

| Operación | Tiempo | Caché |
|-----------|--------|-------|
| `pnpm build` | ~2s | < 100ms ⚡ |
| `pnpm install` | ~3s | ~1s |
| `pnpm dev` | ~1s | N/A |

## 📊 Estado

- ✅ Turborepo configurado
- ✅ pnpm workspaces activo
- ✅ Caché funcionando
- ✅ Ejecución paralela
- ✅ TypeScript sin errores

## 🌐 URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

---

**¿Duda rápida?** Revisa `README.md` o `QUICKSTART.md`
