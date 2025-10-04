#!/bin/bash

# Script para iniciar el monorepo Growfit con Turborepo + pnpm

echo "⚡ Growfit Monorepo - Turborepo + pnpm"
echo ""

# Verificar si pnpm está instalado
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm no está instalado."
    echo "   Instálalo con: npm install -g pnpm"
    exit 1
fi

# Verificar si las dependencias están instaladas
if [ ! -d "node_modules" ]; then
  echo "📦 Instalando dependencias con pnpm..."
  pnpm install
  echo ""
fi

# Construir el paquete shared si no existe
if [ ! -d "packages/shared/dist" ]; then
  echo "🔨 Construyendo paquete shared..."
  pnpm --filter growfit-shared build
  echo ""
fi

echo "✅ Todo listo!"
echo ""
echo "🚀 Iniciando aplicaciones con Turborepo..."
echo ""
pnpm dev

