#!/bin/bash

# Script para preparar el proyecto para despliegue

echo "🚀 Preparando proyecto para despliegue..."

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo -e "${YELLOW}1. Verificando que el build funciona...${NC}"
pnpm build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build exitoso${NC}"
else
    echo "❌ Error en el build. Por favor corrígelo antes de desplegar."
    exit 1
fi

echo ""
echo -e "${YELLOW}2. Verificando variables de entorno...${NC}"

# Verificar .env.example en API
if [ -f "apps/api/.env.example" ]; then
    echo -e "${GREEN}✅ apps/api/.env.example encontrado${NC}"
else
    echo "⚠️  apps/api/.env.example no encontrado"
fi

# Verificar .env.example en Client
if [ -f "apps/client/.env.example" ]; then
    echo -e "${GREEN}✅ apps/client/.env.example encontrado${NC}"
else
    echo "⚠️  apps/client/.env.example no encontrado"
fi

echo ""
echo -e "${YELLOW}3. Verificando archivos de configuración de despliegue...${NC}"

# Verificar Vercel config
if [ -f "apps/client/vercel.json" ]; then
    echo -e "${GREEN}✅ vercel.json encontrado${NC}"
else
    echo "⚠️  vercel.json no encontrado"
fi

# Verificar Railway config
if [ -f "apps/api/Dockerfile" ]; then
    echo -e "${GREEN}✅ Dockerfile encontrado${NC}"
else
    echo "⚠️  Dockerfile no encontrado"
fi

echo ""
echo -e "${GREEN}✨ Proyecto listo para desplegar!${NC}"
echo ""
echo "📋 Próximos pasos:"
echo ""
echo "Para desplegar el Client en Vercel:"
echo "  1. Ve a https://vercel.com"
echo "  2. Importa tu repositorio"
echo "  3. Configura root directory: apps/client"
echo "  4. Sigue las instrucciones en DEPLOYMENT.md"
echo ""
echo "Para desplegar el API en Railway:"
echo "  1. Ve a https://railway.app"
echo "  2. Crea un nuevo proyecto desde GitHub"
echo "  3. Añade PostgreSQL database"
echo "  4. Configura las variables de entorno"
echo "  5. Sigue las instrucciones en DEPLOYMENT.md"
echo ""
echo "📚 Ver guía completa: cat DEPLOYMENT.md"
