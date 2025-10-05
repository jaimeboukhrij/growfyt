# 👨‍💻 Guía de Desarrollo

Esta guía contiene las convenciones, mejores prácticas y workflows para desarrollar en GrowFyt.

## 🎨 Convenciones de Código

### TypeScript

#### Naming Conventions

```typescript
// Interfaces y Types - PascalCase
interface User {
  id: string;
  name: string;
}

type UserRole = 'admin' | 'user';

// Variables y funciones - camelCase
const userName = 'John';
function getUserById(id: string) { }

// Constantes - UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.growfyt.com';

// Clases - PascalCase
class UserService { }

// Archivos - kebab-case
user-service.ts
user.controller.ts
```

#### Type Safety

```typescript
// ✅ Usar tipos explícitos
function getUser(id: string): Promise<User> {
  // ...
}

// ❌ Evitar 'any'
function processData(data: any) {
  // ...
}

// ✅ Usar 'unknown' y type guards
function processData(data: unknown) {
  if (typeof data === 'string') {
    // ...
  }
}
```

### NestJS (API)

#### Estructura de Módulos

```typescript
// users.module.ts
@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Si se usa en otros módulos
})
export class UsersModule {}
```

#### Controllers

```typescript
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return {
      success: true,
      data: await this.usersService.findAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      success: true,
      data: await this.usersService.findOne(id),
    };
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return {
      success: true,
      data: await this.usersService.create(createUserDto),
    };
  }
}
```

**Respuestas estandarizadas:**

```typescript
// ✅ Success
{
  success: true,
  data: { ... }
}

// ✅ Error
{
  success: false,
  error: {
    message: "Error message",
    code: "ERROR_CODE"
  }
}
```

#### Services

```typescript
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
```

### Next.js (Client)

#### Server Components (por defecto)

```tsx
// app/users/page.tsx
export default async function UsersPage() {
  const users = await fetchUsers(); // Fetch en el servidor

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

#### Client Components (cuando sea necesario)

```tsx
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**Cuándo usar Client Components:**
- Hooks de React (useState, useEffect, etc.)
- Event handlers
- Browser APIs
- Librerías que requieren cliente

#### Componentes

```tsx
// Usar interfaces para props
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
}

// Componente funcional
export function UserCard({ user, onEdit }: UserCardProps) {
  return (
    <div className="p-4 border rounded">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {onEdit && (
        <button onClick={() => onEdit(user)}>
          Edit
        </button>
      )}
    </div>
  );
}
```

### Prisma

#### Schema

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
  @@map("users")
}

enum Role {
  USER
  ADMIN
}
```

**Convenciones:**
- IDs: `@default(cuid())` para IDs únicos
- Timestamps: Siempre `createdAt` y `updatedAt`
- Indexes: En campos que se consultan frecuentemente
- Nombres de tabla: `@@map("table_name")` en snake_case

#### Queries

```typescript
// ✅ Usar select para optimizar
const user = await prisma.user.findUnique({
  where: { id },
  select: {
    id: true,
    email: true,
    name: true,
  },
});

// ✅ Usar include para relaciones
const user = await prisma.user.findUnique({
  where: { id },
  include: {
    posts: true,
  },
});

// ✅ Usar transactions para operaciones múltiples
await prisma.$transaction(async (tx) => {
  await tx.user.create({ data: userData });
  await tx.profile.create({ data: profileData });
});
```

## 📁 Organización de Archivos

### API

```
src/
├── main.ts                    # Entry point
├── app.module.ts              # Root module
├── app.controller.ts          # Root controller
│
├── common/                    # Código común
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
│
├── config/                    # Configuración
│   └── app.config.ts
│
├── prisma/                    # Prisma service
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
└── [feature]/                 # Feature modules
    ├── [feature].module.ts
    ├── [feature].controller.ts
    ├── [feature].service.ts
    ├── dto/
    │   ├── create-[feature].dto.ts
    │   └── update-[feature].dto.ts
    └── entities/
        └── [feature].entity.ts
```

### Client

```
app/
├── layout.tsx                 # Root layout
├── page.tsx                   # Home page
├── globals.css                # Global styles
│
├── (auth)/                    # Route groups
│   ├── login/
│   └── register/
│
└── dashboard/                 # Dashboard routes
    ├── layout.tsx
    └── page.tsx

src/
├── components/                # React components
│   ├── ui/                    # UI components
│   │   ├── button.tsx
│   │   └── card.tsx
│   └── features/              # Feature-specific components
│       └── user-profile.tsx
│
├── lib/                       # Utilities
│   ├── api.ts                 # API client
│   └── utils.ts               # Helper functions
│
├── hooks/                     # Custom hooks
│   └── use-user.ts
│
└── types/                     # TypeScript types
    └── api.ts
```

## 🔄 Workflow de Desarrollo

### 1. Crear una nueva feature

```bash
# 1. Crear rama
git checkout -b feature/add-user-profile

# 2. Hacer cambios
# - Editar código
# - Crear tests

# 3. Verificar
pnpm type-check
pnpm build

# 4. Commit
git add .
git commit -m "feat: add user profile page"

# 5. Push
git push origin feature/add-user-profile

# 6. Crear PR en GitHub
```

### 2. Agregar un endpoint en la API

```typescript
// 1. Crear DTO
// src/users/dto/create-user.dto.ts
export class CreateUserDto {
  email: string;
  name: string;
}

// 2. Agregar método en Service
// src/users/users.service.ts
async create(createUserDto: CreateUserDto) {
  return this.prisma.user.create({
    data: createUserDto,
  });
}

// 3. Agregar endpoint en Controller
// src/users/users.controller.ts
@Post()
async create(@Body() createUserDto: CreateUserDto) {
  return {
    success: true,
    data: await this.usersService.create(createUserDto),
  };
}

// 4. Probar
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

### 3. Agregar una página en el Client

```tsx
// 1. Crear página
// app/users/page.tsx
export default async function UsersPage() {
  const users = await fetch('http://localhost:3001/api/users')
    .then(res => res.json());

  return (
    <div>
      <h1>Users</h1>
      {users.data.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// 2. Navegar a http://localhost:3000/users
```

### 4. Modificar el schema de Prisma

```bash
# 1. Editar schema
# apps/api/prisma/schema.prisma
model User {
  # ... agregar campos
  phone String?
}

# 2. Crear migración
cd apps/api
pnpm prisma migrate dev --name add_user_phone

# 3. Generar client
pnpm prisma:generate

# 4. Actualizar código que usa el modelo
```

### 5. Agregar tipo compartido

```typescript
// 1. Agregar en shared
// packages/shared/src/types/user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

// 2. Exportar
// packages/shared/src/index.ts
export * from './types/user';

// 3. Rebuild shared
pnpm --filter=growfit-shared build

// 4. Usar en API o Client
import { User } from 'growfit-shared';
```

## 🧪 Testing

### Unit Tests (API)

```typescript
// users.service.spec.ts
describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should find all users', async () => {
    const mockUsers = [{ id: '1', email: 'test@test.com' }];
    jest.spyOn(prisma.user, 'findMany').mockResolvedValue(mockUsers);

    const result = await service.findAll();
    expect(result).toEqual(mockUsers);
  });
});
```

## 🐛 Debugging

### API

```typescript
// 1. Agregar logs
console.log('User:', user);

// 2. Usar debugger de VS Code
// .vscode/launch.json ya configurado

// 3. Ver queries de Prisma
// .env
DEBUG=prisma:query
```

### Client

```tsx
// 1. Console logs
console.log('Props:', props);

// 2. React DevTools
// Instalar extensión en Chrome

// 3. Network tab
// Ver requests en DevTools
```

## 📦 Dependencias

### Agregar dependencia

```bash
# Para toda la workspace
pnpm add <package>

# Para un paquete específico
pnpm --filter=growfit-api add <package>
pnpm --filter=growfit-client add <package>
pnpm --filter=growfit-shared add <package>

# Dev dependency
pnpm --filter=growfit-api add -D <package>
```

### Actualizar dependencias

```bash
# Ver updates disponibles
pnpm outdated

# Actualizar todas
pnpm update

# Actualizar una específica
pnpm update <package>
```

## 🚀 Build & Deploy

### Build local

```bash
# Build todo
pnpm build

# Build específico
pnpm --filter=growfit-api build
pnpm --filter=growfit-client build
pnpm --filter=growfit-shared build
```

### Deploy a Railway

```bash
# Push a main
git push origin main

# Railway auto-deploya
# Ver logs en Railway dashboard
```

## 📝 Commit Messages

Usar [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Features
git commit -m "feat: add user profile page"
git commit -m "feat(api): add user endpoints"

# Fixes
git commit -m "fix: resolve login redirect issue"
git commit -m "fix(client): fix responsive layout"

# Documentation
git commit -m "docs: update API documentation"

# Refactoring
git commit -m "refactor: simplify user service"

# Style
git commit -m "style: format code with prettier"

# Tests
git commit -m "test: add user service tests"

# Chores
git commit -m "chore: update dependencies"
```

## 🎯 Best Practices

### General

1. **Commits pequeños y frecuentes**
2. **Nombres descriptivos** para variables y funciones
3. **Comentarios** solo cuando el código no es autoexplicativo
4. **Type safety**: Evitar `any`, usar tipos estrictos
5. **Error handling**: Siempre manejar errores

### API

1. **Validación**: Usar DTOs con class-validator
2. **Seguridad**: Nunca exponer datos sensibles
3. **Performance**: Optimizar queries de Prisma
4. **Documentation**: Agregar comentarios JSDoc

### Client

1. **Composition**: Componentes pequeños y reutilizables
2. **Server Components**: Usar por defecto
3. **Loading states**: Siempre mostrar loading
4. **Error handling**: Mostrar errores al usuario

### Database

1. **Indexes**: En campos que se consultan frecuentemente
2. **Migrations**: Siempre probar antes de deploy
3. **Backups**: En producción
4. **Seeds**: Para datos iniciales

## 🆘 Troubleshooting Común

Ver [QUICKSTART.md](./QUICKSTART.md#-troubleshooting) para problemas comunes.

---

¡Happy coding! 🎉
