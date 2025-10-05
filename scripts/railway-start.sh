#!/bin/ba# Step 2: Build all packages using Turbo (this will automatically run prisma:generate first)
echo "🔧 Building all packages with Turbo (including Prisma generation)..."
pnpm turbo run build  # Exit on error

echo "🚀 Starting Railway deployment process..."

# Step 1: Clean cache files
echo "🧹 Cleaning TypeScript incremental build cache..."
rm -rf packages/shared/tsconfig.tsbuildinfo apps/api/tsconfig.build.tsbuildinfo

# Step 2: Generate Prisma Client first (critical for TypeScript compilation)
echo "🔧 Generating Prisma client..."
cd apps/api
npx prisma generate
cd ../..

# Step 3: Build all packages using Turbo
echo "� Building all packages with Turbo..."
pnpm turbo run build

# Verify builds completed
if [ ! -d "packages/shared/dist" ]; then
    echo "❌ ERROR: packages/shared/dist directory not found after build"
    exit 1
fi

echo "✅ All packages built successfully"

# Step 3: Database migrations
echo "�️  Running database migrations..."
cd apps/api
npx prisma migrate reset --force || npx prisma db push --force-reset
npx prisma migrate deploy
cd ../..

# Step 4: Copy shared package to API node_modules (workaround for Railway)
echo "📋 Copying shared package to API..."
mkdir -p apps/api/node_modules/growfit-shared
cp -r packages/shared/dist apps/api/node_modules/growfit-shared/
cp packages/shared/package.json apps/api/node_modules/growfit-shared/

echo "✅ Build and setup completed successfully!"

# Step 5: Start the application
echo "🎯 Starting application..."
cd apps/api
node dist/apps/api/src/main.js
