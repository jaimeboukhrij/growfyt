# growfit-shared

Paquete compartido con tipos, interfaces y utilidades comunes para las aplicaciones de Growfit.

## 📦 Contenido

Este paquete contiene:

- **Tipos compartidos**: Interfaces TypeScript usadas por client y api
- **Constantes**: Valores constantes compartidos
- **Utilidades**: Funciones helper comunes

## 🔧 Desarrollo

### Build

```bash
npm run build
```

### Watch mode (reconstrucción automática)

```bash
npm run dev
```

### Type check

```bash
npm run type-check
```

## 📝 Uso

En cualquier aplicación del monorepo:

```typescript
import { User, ApiResponse, APP_NAME } from "growfit-shared";

const user: User = {
  id: "1",
  name: "Juan",
  email: "juan@example.com",
  createdAt: new Date(),
};

const response: ApiResponse<User> = {
  success: true,
  data: user,
};
```

## ➕ Añadir nuevos tipos

1. Edita `src/index.ts`
2. Añade tus tipos/interfaces/constantes
3. Exporta los nuevos elementos
4. Reconstruye el paquete: `npm run build`

## 🏗️ Estructura

```
shared/
├── src/
│   └── index.ts      # Punto de entrada, todos los exports aquí
├── dist/             # Código compilado (generado automáticamente)
│   ├── index.js
│   ├── index.d.ts
│   └── index.d.ts.map
├── tsconfig.json     # Configuración TypeScript
└── package.json
```

## ⚠️ Importante

Después de modificar este paquete, las aplicaciones que lo usan necesitarán reiniciarse para ver los cambios. Si estás en desarrollo, considera usar el modo watch:

```bash
npm run dev -w packages/shared
```
