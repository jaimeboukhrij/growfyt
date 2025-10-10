# Color Palette

Paleta compilada a partir de los tokens definidos en `apps/client/src/app/globals.css`.
Incluye los valores en formato OKLCH (fuente de verdad) y la conversión aproximada a HEX
para facilitar su consumo en herramientas de diseño. Los valores HEX se redondean a sRGB,
por lo que debe preferirse OKLCH dentro del código cuando sea posible.

## Tema Claro

| Token | OKLCH | HEX aprox. | Uso principal |
| --- | --- | --- | --- |
| `--background` | `oklch(0.99 0 0)` | `#FCFCFC` | Fondo base de la app |
| `--foreground` | `oklch(0.15 0 0)` | `#0B0B0B` | Texto primario |
| `--card` | `oklch(1 0 0)` | `#FFFFFF` | Superficies elevadas |
| `--card-foreground` | `oklch(0.15 0 0)` | `#0B0B0B` | Texto sobre tarjetas |
| `--popover` | `oklch(1 0 0)` | `#FFFFFF` | Popovers, tooltips |
| `--popover-foreground` | `oklch(0.15 0 0)` | `#0B0B0B` | Texto en popovers |
| `--primary` | `oklch(0.55 0.15 165)` | `#008B5B` | Marca, CTAs, énfasis |
| `--primary-foreground` | `oklch(0.99 0 0)` | `#FCFCFC` | Texto en botones primarios |
| `--secondary` | `oklch(0.96 0.005 165)` | `#EFF3F1` | Fondos secundarios |
| `--secondary-foreground` | `oklch(0.15 0 0)` | `#0B0B0B` | Texto en superficies secundarias |
| `--muted` | `oklch(0.97 0.005 165)` | `#F2F6F4` | Secciones neutrales |
| `--muted-foreground` | `oklch(0.5 0.01 165)` | `#5E6562` | Texto deshabilitado/terciario |
| `--accent` | `oklch(0.96 0.01 165)` | `#ECF4F0` | Hovers, badges suaves |
| `--accent-foreground` | `oklch(0.15 0 0)` | `#0B0B0B` | Texto sobre acentos |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `#E7000B` | Errores y alertas |
| `--destructive-foreground` | `oklch(0.99 0 0)` | `#FCFCFC` | Texto en estados destructivos |
| `--border` | `oklch(0.93 0.005 165)` | `#E5E9E7` | Bordes, inputs |
| `--input` | `oklch(0.93 0.005 165)` | `#E5E9E7` | Contornos de inputs |
| `--ring` | `oklch(0.55 0.15 165)` | `#008B5B` | Focus visible |
| `--sidebar` | `oklch(0.99 0 0)` | `#FCFCFC` | Fondo de sidebar |
| `--sidebar-foreground` | `oklch(0.15 0 0)` | `#0B0B0B` | Texto en sidebar |
| `--sidebar-primary` | `oklch(0.55 0.15 165)` | `#008B5B` | Selecciones activas en sidebar |
| `--sidebar-primary-foreground` | `oklch(0.99 0 0)` | `#FCFCFC` | Texto sobre selección activa |
| `--sidebar-accent` | `oklch(0.96 0.01 165)` | `#ECF4F0` | Hover en items de sidebar |
| `--sidebar-accent-foreground` | `oklch(0.15 0 0)` | `#0B0B0B` | Texto en hover sidebar |
| `--sidebar-border` | `oklch(0.93 0.005 165)` | `#E5E9E7` | Separadores de sidebar |
| `--sidebar-ring` | `oklch(0.55 0.15 165)` | `#008B5B` | Estados de foco en sidebar |

## Tema Oscuro

| Token | OKLCH | HEX aprox. | Uso principal |
| --- | --- | --- | --- |
| `--background` | `oklch(0.145 0 0)` | `#0A0A0A` | Fondo base oscuro |
| `--foreground` | `oklch(0.985 0 0)` | `#FAFAFA` | Texto primario |
| `--card` | `oklch(0.145 0 0)` | `#0A0A0A` | Superficies elevadas |
| `--card-foreground` | `oklch(0.985 0 0)` | `#FAFAFA` | Texto sobre tarjetas |
| `--popover` | `oklch(0.145 0 0)` | `#0A0A0A` | Popovers, tooltips |
| `--popover-foreground` | `oklch(0.985 0 0)` | `#FAFAFA` | Texto en popovers |
| `--primary` | `oklch(0.985 0 0)` | `#FAFAFA` | CTA y elementos principales |
| `--primary-foreground` | `oklch(0.205 0 0)` | `#171717` | Texto sobre primario oscuro |
| `--secondary` | `oklch(0.269 0 0)` | `#262626` | Contenedores secundarios |
| `--secondary-foreground` | `oklch(0.985 0 0)` | `#FAFAFA` | Texto en superficies secundarias |
| `--muted` | `oklch(0.269 0 0)` | `#262626` | Secciones neutrales |
| `--muted-foreground` | `oklch(0.708 0 0)` | `#A1A1A1` | Texto terciario |
| `--accent` | `oklch(0.269 0 0)` | `#262626` | Estados hover/acento |
| `--accent-foreground` | `oklch(0.985 0 0)` | `#FAFAFA` | Texto sobre acentos |
| `--destructive` | `oklch(0.396 0.141 25.723)` | `#82181A` | Errores y alertas |
| `--destructive-foreground` | `oklch(0.637 0.237 25.331)` | `#FB2C36` | Iconografía/texto en errores |
| `--border` | `oklch(0.269 0 0)` | `#262626` | Bordes, inputs |
| `--input` | `oklch(0.269 0 0)` | `#262626` | Contornos de inputs |
| `--ring` | `oklch(0.439 0 0)` | `#525252` | Focus visible |
| `--sidebar` | `oklch(0.205 0 0)` | `#171717` | Fondo de sidebar |
| `--sidebar-foreground` | `oklch(0.985 0 0)` | `#FAFAFA` | Texto en sidebar |
| `--sidebar-primary` | `oklch(0.488 0.243 264.376)` | `#1447E6` | Items activos |
| `--sidebar-primary-foreground` | `oklch(0.985 0 0)` | `#FAFAFA` | Texto sobre item activo |
| `--sidebar-accent` | `oklch(0.269 0 0)` | `#262626` | Hover sidebar |
| `--sidebar-accent-foreground` | `oklch(0.985 0 0)` | `#FAFAFA` | Texto en hover |
| `--sidebar-border` | `oklch(0.269 0 0)` | `#262626` | Separadores |
| `--sidebar-ring` | `oklch(0.439 0 0)` | `#525252` | Focus en sidebar |

## Paleta para Visualizaciones

Valores definidos en `--chart-1` a `--chart-5` con sus equivalentes en modo oscuro:

| Token | Tema claro | HEX aprox. | Tema oscuro | HEX aprox. |
| --- | --- | --- | --- | --- |
| `--chart-1` | `oklch(0.55 0.15 165)` | `#008B5B` | `oklch(0.488 0.243 264.376)` | `#1447E6` |
| `--chart-2` | `oklch(0.65 0.18 200)` | `#00ADBA` | `oklch(0.696 0.17 162.48)` | `#00BC7D` |
| `--chart-3` | `oklch(0.7 0.12 140)` | `#75B168` | `oklch(0.769 0.188 70.08)` | `#FE9A00` |
| `--chart-4` | `oklch(0.6 0.2 280)` | `#6E69F3` | `oklch(0.627 0.265 303.9)` | `#AD46FF` |
| `--chart-5` | `oklch(0.75 0.15 80)` | `#DFA11A` | `oklch(0.645 0.246 16.439)` | `#FF2056` |

## Notas de Uso

- **Token source of truth**: modificar los valores únicamente en `apps/client/src/app/globals.css` para mantener consistencia con Tailwind y componentes.
- **Preferir OKLCH**: el modelo OKLCH es perceptualmente uniforme; usar los valores HEX sólo cuando herramientas externas no soporten OKLCH.
- **Accesibilidad**: los pares foreground/background actuales superan ratios AA; validar si se introducen nuevos estados intermedios.
- **Íconos heredados**: los SVG públicos usan `#666666`; considerar actualizarlos a neutrales de la paleta para coherencia visual.
