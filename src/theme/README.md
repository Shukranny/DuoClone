# Design System Documentation

This folder contains the design tokens and theme configuration for the Lingua language learning app. All design decisions follow the Lingua brand guidelines and ensure consistency across the app.

## Structure

- **colors.ts** - Brand colors, semantic colors, and neutral palette
- **typography.ts** - Font family, sizes, weights, and line heights
- **spacing.ts** - Spacing scale and border radius utilities
- **index.ts** - Central export point for all design tokens

## Color Palette

### Primary Brand Colors (Purple → Blue → Green)

- **Purple**: `#6C4EF5` - Main brand color
- **Deep Purple**: `#5B3BF6` - Secondary accent
- **Blue**: `#4D8BFF` - Tertiary accent
- **Green**: `#21C16B` - Success state

### Semantic Colors

- **Success**: `#21C16B` - Positive actions/states
- **Warning**: `#FFC800` - Warnings/cautions
- **Streak**: `#FF8A00` - Streak/achievements
- **Error**: `#FF4D4F` - Errors/destructive actions
- **Info**: `#4D8BFF` - Information

### Neutral Colors

- **Text Primary**: `#0D132B` - Main text (dark navy)
- **Text Secondary**: `#6B7280` - Secondary text (gray)
- **Border**: `#E5E7EB` - Borders and dividers
- **Surface**: `#F6F7FB` - Light backgrounds/cards
- **Background**: `#FFFFFF` - Page background

## Typography

Font Family: **Poppins** (modern, geometric sans-serif)

### Type Scale

| Style | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| H1 | 32px | Bold (700) | 1.2 | Page/Screen titles |
| H2 | 24px | SemiBold (600) | 1.3 | Section titles |
| H3 | 20px | SemiBold (600) | 1.3 | Card/Module titles |
| H4 | 16px | Medium (500) | 1.4 | Subheadings |
| Body Large | 16px | Regular (400) | 1.6 | Important content |
| Body Medium | 14px | Regular (400) | 1.6 | Body text |
| Body Small | 13px | Regular (400) | 1.6 | Supporting text |
| Caption | 11px | Regular (400) | 1.4 | Labels, meta text |

### Font Weights

- **Regular**: 400
- **Medium**: 500
- **SemiBold**: 600
- **Bold**: 700

## Spacing Scale

Uses a 4px base unit for consistency:

```
1 = 4px
2 = 8px
3 = 12px
4 = 16px
5 = 20px
6 = 24px
8 = 32px
12 = 48px
16 = 64px
...
```

## Border Radius

- **None**: 0
- **Small**: 4px
- **Base**: 8px
- **Medium**: 12px
- **Large**: 16px
- **XL**: 20px
- **2XL**: 24px
- **Full**: 9999px (rounded)

## Usage Examples

### In Components

```tsx
import { linguaColors, typography } from "@/theme";

export function MyComponent() {
  return (
    <View style={{ backgroundColor: linguaColors.surface }}>
      <Text style={{ color: linguaColors.textPrimary }}>
        This uses the design system colors
      </Text>
    </View>
  );
}
```

### With Tailwind/NativeWind

```tsx
export function MyComponent() {
  return (
    <View className="bg-surface">
      <Text className="text-h2 text-text-primary">Section Title</Text>
      <Text className="text-body-md text-text-secondary">Supporting text</Text>
    </View>
  );
}
```

### Available Tailwind Classes

**Text Colors:**
- `text-text-primary` - Primary text
- `text-text-secondary` - Secondary text
- `text-success` - Success green
- `text-warning` - Warning yellow
- `text-error` - Error red
- `text-info` - Info blue

**Background Colors:**
- `bg-primary` - Lingua Purple
- `bg-success` - Success green
- `bg-warning` - Warning yellow
- `bg-error` - Error red
- `bg-surface` - Light surface
- `bg-background` - White background

**Typography:**
- `text-h1` through `text-h4` - Headings
- `text-body-lg`, `text-body-md`, `text-body-sm` - Body text
- `text-caption` - Captions

**Components:**
- `.btn-primary`, `.btn-secondary`, `.btn-success`, `.btn-danger`
- `.card-base` - Card styling
- `.input-base` - Input styling
- `.badge`, `.badge-primary`, `.badge-success`, etc.

## Font Loading

Fonts are automatically loaded from `assets/fonts/`:
- Poppins-Regular.ttf (400)
- Poppins-Medium.ttf (500)
- Poppins-SemiBold.ttf (600)
- Poppins-Bold.ttf (700)

Font face declarations are in `globals.css`.

## Extending the Design System

To add new tokens:

1. Add to the appropriate file in `src/theme/`
2. Export from `src/theme/index.ts`
3. Update `tailwind.config.js` if adding Tailwind utilities
4. Add corresponding CSS utilities in `globals.css` if needed

## Brand Philosophy

The design system reflects Lingua's playful, modern, and educational nature:
- **Purple** represents creativity and learning
- **Bold typography** ensures readability on mobile
- **Generous spacing** creates breathing room
- **Semantic colors** provide clear feedback
