# Prisma + TurboRepo Build Integration Fix

## Problem
TypeScript build in `apps/api` was failing with Prisma Client type errors:
```
Module '"@prisma/client"' has no exported member 'PrismaClient'
```

The root cause was that Prisma Client was not being generated before the TypeScript compilation, so the type definitions were missing.

## Solution

### 1. Updated turbo.json to Add Prisma Generation Task
Added a new `prisma:generate` task to the pipeline and made it a dependency of the `build` task:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "prisma:generate": {
      "cache": false,
      "outputs": ["node_modules/.prisma/**"]
    },
    "build": {
      "dependsOn": ["^build", "prisma:generate"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    }
    // ... other tasks
  }
}
```

**Key points:**
- `prisma:generate` has `cache: false` to ensure it always runs fresh
- `build` task now depends on `prisma:generate` through `dependsOn`
- This ensures Prisma Client types are always available before TypeScript compilation

### 2. Updated apps/api/package.json
While not strictly necessary with the Turbo dependency setup, we kept the `prebuild` script for direct builds:

```json
{
  "scripts": {
    "prebuild": "prisma generate",
    "build": "tsc -p tsconfig.build.json"
  }
}
```

### 3. Updated Railway Start Script
Simplified `scripts/railway-start.sh` to rely on Turbo's dependency management:

```bash
#!/bin/bash
set -e

echo "🚀 Starting Railway deployment process..."

# Step 1: Clean cache files
echo "🧹 Cleaning TypeScript incremental build cache..."
rm -rf packages/shared/tsconfig.tsbuildinfo apps/api/tsconfig.build.tsbuildinfo

# Step 2: Build all packages using Turbo (this will automatically run prisma:generate first)
echo "🔧 Building all packages with Turbo (including Prisma generation)..."
pnpm turbo run build

# ... rest of deployment steps
```

**Key improvement:** 
- No longer manually calling `prisma generate` before build
- Turbo automatically handles the dependency and runs Prisma generation before building the API

## How It Works

1. When you run `pnpm turbo run build`, Turbo:
   - Analyzes the dependency graph
   - Sees that `growfit-api:build` depends on `prisma:generate`
   - Runs `prisma:generate` first (generates Prisma Client types)
   - Then runs the TypeScript build with all types available

2. Build order:
   ```
   prisma:generate (in api)
   ↓
   build (in shared) - parallel with api build
   ↓
   build (in api) - TypeScript compilation with Prisma types
   ↓
   build (in client)
   ```

## Testing

To test the complete build process:

```bash
# Clean everything
rm -rf packages/shared/dist apps/api/dist \
  packages/shared/tsconfig.tsbuildinfo \
  apps/api/tsconfig.build.tsbuildinfo

# Run full build (should work without errors)
pnpm turbo run build

# Verify outputs exist
ls -la packages/shared/dist
ls -la apps/api/dist
```

## Benefits

1. **Declarative Dependencies**: Build order is declared in turbo.json, not in bash scripts
2. **Consistent Builds**: Works the same locally and in CI/CD
3. **No Caching Issues**: Prisma generation is never cached (cache: false)
4. **Type Safety**: TypeScript always has access to Prisma types during compilation
5. **Cleaner Scripts**: Railway start script is simpler and more maintainable

## Related Issues Fixed

- ❌ `cp: cannot stat 'packages/shared/dist': No such file or directory` - Fixed by `.gitignore` and build script changes (see `TYPESCRIPT_BUILD_FIX.md`)
- ❌ `Module '"@prisma/client"' has no exported member 'PrismaClient'` - Fixed by this Prisma+Turbo integration

## Files Modified

- `turbo.json` - Added `prisma:generate` task and build dependency
- `apps/api/package.json` - Added `prebuild` script
- `scripts/railway-start.sh` - Simplified to rely on Turbo dependencies
- `.gitignore` - Added `*.tsbuildinfo` (previous fix)
- `packages/shared/package.json` - Improved build script (previous fix)

## Notes

- This fix works with TurboRepo v1.13.4 (using `pipeline` key)
- Newer Turbo versions use `tasks` instead of `pipeline`
- The `cache: false` setting on `prisma:generate` is critical - Prisma generates code based on the schema and database state, so it should not be cached
