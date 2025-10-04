# growfit-api

API backend de Growfit construida con NestJS 11, Prisma y PostgreSQL.

## 🚀 Tecnologías

- **NestJS 11** - Framework enterprise-grade para Node.js
- **Prisma** - ORM moderno y type-safe
- **PostgreSQL** - Base de datos relacional
- **TypeScript** - Tipado estático
- **Decorators** - Arquitectura basada en decoradores

## 📋 Prerrequisitos

### PostgreSQL

Necesitas tener PostgreSQL instalado y corriendo:

**macOS (Homebrew):**

```bash
brew install postgresql@15
brew services start postgresql@15
```

**Docker:**

```bash
docker run --name growfit-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15
```

## 🏁 Inicio Rápido

### 1. Configurar Variables de Entorno

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales de PostgreSQL:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/growfit?schema=public"
```

### 2. Instalar Dependencias

```bash
pnpm install
```

### 3. Crear Base de Datos y Ejecutar Migraciones

```bash
# Crear base de datos y ejecutar migraciones
pnpm prisma:migrate

# Generar Prisma Client
pnpm prisma:generate

# Poblar con datos de prueba
pnpm prisma:seed
```

### 4. Iniciar en Desarrollo

```bash
pnpm dev
```

La API estará disponible en http://localhost:3001

## 📁 Estructura

```
api/
├── prisma/
│   ├── schema.prisma      # Esquema de la base de datos
│   └── seed.ts            # Datos de prueba
├── src/
│   ├── prisma/            # Módulo Prisma
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── users/             # Módulo Users
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   └── users.service.ts
│   ├── app.module.ts      # Módulo raíz
│   ├── app.controller.ts  # Controlador raíz
│   ├── app.service.ts     # Servicio raíz
│   └── main.ts            # Entry point
├── .env                   # Variables de entorno
├── nest-cli.json          # Configuración Nest CLI
├── tsconfig.json          # TypeScript config
└── package.json
```

## 📡 API Endpoints

### Root

```
GET /api          → Información de la API
GET /api/health   → Health check
```

### Users

```
GET /api/users    → Listar todos los usuarios
```

## 🗃️ Prisma Commands

### Migraciones

```bash
# Crear una nueva migración
pnpm prisma:migrate

# Reset de la base de datos
pnpm prisma migrate reset

# Ver estado de migraciones
pnpm prisma migrate status

# Aplicar migraciones pendientes
pnpm prisma migrate deploy
```

### Prisma Studio

```bash
# Abrir Prisma Studio (GUI para la DB)
pnpm prisma:studio
```

### Generar Cliente

```bash
# Regenerar Prisma Client después de cambios en schema
pnpm prisma:generate
```

### Seed

```bash
# Poblar base de datos con datos de prueba
pnpm prisma:seed
```

## 🏗️ Arquitectura NestJS

### Módulos

NestJS organiza el código en módulos:

```typescript
@Module({
  imports: [ConfigModule, PrismaModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Controladores

Manejan las peticiones HTTP:

```typescript
@Controller("users")
export class UsersController {
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
```

### Servicios

Contienen la lógica de negocio:

```typescript
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }
}
```

## 🔄 Desarrollo

### Hot Reload

El servidor se recarga automáticamente al hacer cambios:

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Producción

```bash
pnpm start:prod
```

## 🧪 Testing (Por Implementar)

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Coverage
pnpm test:cov
```

## 📝 Añadir Nuevas Entidades

### 1. Actualizar Schema de Prisma

```prisma
model Post {
  id        String   @id @default(uuid())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("posts")
}
```

### 2. Ejecutar Migración

```bash
pnpm prisma:migrate
```

### 3. Generar Módulo

```bash
# Usando Nest CLI (si está instalado globalmente)
nest generate module posts
nest generate controller posts
nest generate service posts
```

## 🔐 Variables de Entorno

```env
# Server
NODE_ENV=development
PORT=3001

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 🐘 PostgreSQL Tips

### Conectar a la Base de Datos

```bash
psql -U postgres
```

### Crear Base de Datos

```sql
CREATE DATABASE growfit;
```

### Listar Tablas

```sql
\dt
```

### Ver Datos

```sql
SELECT * FROM users;
```

## 🎯 Próximos Pasos

- [ ] Añadir autenticación (JWT)
- [ ] Implementar validación de datos (class-validator)
- [ ] Añadir documentación Swagger
- [ ] Implementar testing
- [ ] Añadir logging (winston)
- [ ] Rate limiting
- [ ] Pagination
- [ ] Filtering y sorting

## 📚 Recursos

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Construido con NestJS 11 + Prisma + PostgreSQL 🚀**
