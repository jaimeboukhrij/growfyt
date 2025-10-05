# Pre-Deployment Checklist

## ✅ Fixes Applied

### 1. TypeScript Incremental Build Cache Fix
- [x] Added `*.tsbuildinfo` to `.gitignore`
- [x] Removed tracked `tsconfig.tsbuildinfo` files from git
- [x] Updated `packages/shared/package.json` build script to clean cache
- [x] Set `emitDeclarationOnly: false` in `packages/shared/tsconfig.json`

### 2. Prisma + TurboRepo Integration Fix
- [x] Added `prisma:generate` task to `turbo.json`
- [x] Made `build` depend on `prisma:generate` in Turbo pipeline
- [x] Added `prebuild` script to `apps/api/package.json`
- [x] Updated `scripts/railway-start.sh` to use Turbo dependencies
- [x] Created documentation (`PRISMA_TURBO_FIX.md`)

## 🧪 Local Testing Completed

- [x] Clean build test successful:
  ```bash
  rm -rf packages/shared/dist apps/api/dist
  pnpm turbo run build
  # Result: ✅ All builds completed successfully
  ```

- [x] Verified outputs:
  - [x] `packages/shared/dist/` contains compiled JS and type definitions
  - [x] `apps/api/dist/` contains compiled API code
  - [x] No TypeScript compilation errors
  - [x] Prisma Client types available during build

## 📝 Next Steps

### Before Pushing to Railway:

1. **Review Changes**
   ```bash
   git log -1 --stat
   git diff HEAD~1
   ```

2. **Verify Environment Variables** (in Railway dashboard)
   - DATABASE_URL is set correctly
   - NODE_ENV is set to "production"
   - Any other required env vars are configured

3. **Check Railway Configuration**
   - Build command: `pnpm install && chmod +x scripts/railway-start.sh`
   - Start command: `./scripts/railway-start.sh`
   - Procfile is present and correct

### Push to Railway:

```bash
git push origin main
```

### Monitor Deployment:

1. **Watch Railway Build Logs** for:
   - ✅ TypeScript cache cleaning
   - ✅ Prisma Client generation
   - ✅ Turbo build completing for all packages
   - ✅ No "cannot stat" errors
   - ✅ No TypeScript errors about missing Prisma types
   - ✅ Database migrations running
   - ✅ Application starting successfully

2. **Expected Log Output**:
   ```
   🚀 Starting Railway deployment process...
   🧹 Cleaning TypeScript incremental build cache...
   🔧 Building all packages with Turbo (including Prisma generation)...
   • Running build in 3 packages
   growfit-api:prisma:generate: ✔ Generated Prisma Client
   growfit-shared:build: ... (TypeScript compilation)
   growfit-api:build: ... (TypeScript compilation with Prisma types)
   ✅ All packages built successfully
   🗄️ Running database migrations...
   ✅ Build and setup completed successfully!
   🎯 Starting application...
   ```

3. **Test the Deployed Application**:
   - Access your Railway URL
   - Test API endpoints
   - Verify database connectivity

## 🐛 Troubleshooting

### If Build Fails:

1. **Check for "cannot stat" errors**
   - Look for: `cp: cannot stat 'packages/shared/dist'`
   - If present: Check if TypeScript cache was properly cleaned
   - Solution: Verify `.gitignore` has `*.tsbuildinfo`

2. **Check for Prisma type errors**
   - Look for: `Module '"@prisma/client"' has no exported member 'PrismaClient'`
   - If present: Verify `prisma:generate` task is in `turbo.json`
   - Solution: Ensure `build` depends on `prisma:generate`

3. **Check for pnpm/turbo errors**
   - Look for: Workspace resolution errors
   - Solution: Ensure `pnpm-workspace.yaml` is correct

### If Deployment Succeeds but App Crashes:

1. **Check Runtime Logs** for:
   - Database connection errors
   - Missing environment variables
   - Port binding issues

2. **Verify**:
   - DATABASE_URL is accessible from Railway
   - Migrations ran successfully
   - Node version matches (check Railway Node version)

## 📚 Documentation

All fixes are documented in:
- `TYPESCRIPT_BUILD_FIX.md` - TypeScript incremental build cache issues
- `PRISMA_TURBO_FIX.md` - Prisma + TurboRepo integration
- This checklist - Pre-deployment verification

## 🎯 Expected Outcome

After pushing to Railway, you should see:
- ✅ Clean, reproducible builds
- ✅ No TypeScript caching issues
- ✅ Prisma Client types available during compilation
- ✅ All packages building in correct order
- ✅ Successful deployment and running application

---

**Ready to deploy?** Run: `git push origin main`

Then monitor the Railway dashboard for the build and deployment status!
