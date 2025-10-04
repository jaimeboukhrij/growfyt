#!/bin/bash

# Script para verificar la configuración de dominios y despliegue
# GrowFit - Domain Verification Script

echo "🔍 Verificando configuración de GrowFit..."
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Dominios
CLIENT_DOMAIN="app.growfyt.com"
API_DOMAIN="api.growfyt.com"

echo "📋 Verificando DNS..."
echo ""

# Verificar DNS del Client
echo -n "  🌐 $CLIENT_DOMAIN: "
if dig +short $CLIENT_DOMAIN | grep -q "."; then
    echo -e "${GREEN}✅ DNS configurado${NC}"
    dig +short $CLIENT_DOMAIN | head -1
else
    echo -e "${RED}❌ DNS no encontrado${NC}"
fi

echo ""

# Verificar DNS del API (opcional)
echo -n "  🔌 $API_DOMAIN: "
if dig +short $API_DOMAIN | grep -q "."; then
    echo -e "${GREEN}✅ DNS configurado${NC}"
    dig +short $API_DOMAIN | head -1
else
    echo -e "${YELLOW}⚠️  DNS no configurado (opcional)${NC}"
fi

echo ""
echo "🔐 Verificando SSL..."
echo ""

# Verificar SSL del Client
echo -n "  🌐 https://$CLIENT_DOMAIN: "
if curl -s -o /dev/null -w "%{http_code}" https://$CLIENT_DOMAIN | grep -q "200\|301\|302"; then
    echo -e "${GREEN}✅ SSL activo y funcionando${NC}"
else
    echo -e "${RED}❌ No se pudo conectar${NC}"
fi

echo ""

# Verificar API Health (si está configurada)
echo "🏥 Verificando API Health..."
echo ""

# Intentar con dominio personalizado primero
echo -n "  🔌 https://$API_DOMAIN/api/health: "
if curl -s https://$API_DOMAIN/api/health > /dev/null 2>&1; then
    RESPONSE=$(curl -s https://$API_DOMAIN/api/health)
    if echo "$RESPONSE" | grep -q "success"; then
        echo -e "${GREEN}✅ API respondiendo correctamente${NC}"
        echo "     $RESPONSE"
    else
        echo -e "${YELLOW}⚠️  API responde pero formato inesperado${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Dominio personalizado no configurado o no responde${NC}"
    echo "     Verifica la URL de tu API en Railway"
fi

echo ""
echo "📊 Resumen:"
echo ""
echo "  Client URL: https://$CLIENT_DOMAIN"
echo "  API URL: https://$API_DOMAIN (o Railway URL)"
echo ""

# Verificar propagación global
echo "🌍 Para verificar propagación DNS global:"
echo "   https://dnschecker.org/#CNAME/$CLIENT_DOMAIN"
echo ""

# Verificar configuración en navegador
echo "🔍 Verificaciones adicionales en navegador:"
echo "   1. Abrir: https://$CLIENT_DOMAIN"
echo "   2. Verificar candado 🔒 SSL"
echo "   3. Abrir DevTools (F12) → Console"
echo "   4. Verificar que no hay errores CORS"
echo ""

echo "✅ Verificación completa!"
