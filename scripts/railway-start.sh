#!/bin/bash
set -e  # Exit on error

echo "🚀 Starting Railway deployment process..."

# Step 1: Build shared package
echo "📦 Building growfit-shared..."
echo "🔍 Current directory: $(pwd)"

# Clean any previous build artifacts and incremental build cache
echo "🧹 Cleaning previous build artifacts and cache..."
rm -rf packages/shared/dist packages/shared/tsconfig.tsbuildinfo

# Build shared package
echo "🔨 Compiling growfit-shared..."
pnpm --filter growfit-shared build

# Verify shared package build
if [ ! -d "packages/shared/dist" ]; then
    echo "❌ ERROR: packages/shared/dist directory not found after build"
    echo "📁 Contents of packages/shared:"
    ls -la packages/shared/
    echo "📋 TypeScript version:"
    npx tsc --version
    echo "🔍 Showing TypeScript configuration:"
    cd packages/shared
    npx tsc --showConfig
    cd ../..
    exit 1
fi

echo "✅ Shared package built successfully"
echo "📁 Contents of packages/shared/dist:"
ls -la packages/shared/dist/

# Step 2: Build API
echo "📦 Building growfit-api..."
pnpm --filter growfit-api build

# Step 3: Generate Prisma client
echo "🔧 Generating Prisma client..."
cd apps/api
pnpm prisma:generate

# Step 4: Database setup
echo "🗄️  Setting up database..."
npx prisma migrate reset --force || npx prisma db push --force-reset
npx prisma migrate deploy

# Step 5: Copy shared package to API node_modules
echo "📋 Copying shared package to API..."
cd ../..
mkdir -p apps/api/node_modules/growfit-shared
cp -r packages/shared/dist apps/api/node_modules/growfit-shared/
cp packages/shared/package.json apps/api/node_modules/growfit-shared/

echo "✅ Build and setup completed successfully!"

# Step 6: Start the application
echo "🎯 Starting application..."
cd apps/api
node dist/apps/api/src/main.js
