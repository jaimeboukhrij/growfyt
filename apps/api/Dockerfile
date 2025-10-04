# Dockerfile para NestJS API
FROM node:20-alpine AS base

# Instalar pnpm
RUN npm install -g pnpm

# Configurar directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración del monorepo
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY turbo.json ./

# Copiar el código de todos los workspaces
COPY apps/api ./apps/api
COPY packages/shared ./packages/shared

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Construir el proyecto
RUN pnpm --filter growfit-shared build
RUN pnpm --filter growfit-api build

# Generar Prisma Client
WORKDIR /app/apps/api
RUN pnpm prisma:generate

# Stage de producción
FROM node:20-alpine AS production

RUN npm install -g pnpm

WORKDIR /app

# Copiar archivos necesarios desde el build
COPY --from=base /app/package.json ./
COPY --from=base /app/pnpm-workspace.yaml ./
COPY --from=base /app/pnpm-lock.yaml ./
COPY --from=base /app/apps/api/package.json ./apps/api/
COPY --from=base /app/packages/shared/package.json ./packages/shared/

# Instalar solo dependencias de producción
RUN pnpm install --prod --frozen-lockfile

# Copiar el código compilado
COPY --from=base /app/apps/api/dist ./apps/api/dist
COPY --from=base /app/packages/shared/dist ./packages/shared/dist
COPY --from=base /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=base /app/node_modules/@prisma ./node_modules/@prisma

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3001

# Exponer el puerto
EXPOSE 3001

# Comando de inicio
WORKDIR /app/apps/api
CMD ["node", "dist/apps/api/src/main.js"]
