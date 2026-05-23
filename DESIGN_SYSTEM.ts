/**
 * Flipkart Clone - Design System Documentation
 * 
 * This document provides comprehensive guidance on using the design system,
 * components, and tokens built into this ecommerce application.
 */

// ============================================================================
// DESIGN SYSTEM ARCHITECTURE
// ============================================================================

/*
The design system is organized into several layers:

1. TOKENS (constants/)
   - colors.ts: Color palette (primary, secondary, status, text, etc.)
   - typography.ts: Font sizes, weights, line heights, preset styles
   - layout.ts: Spacing scale, breakpoints, shadows, z-index
   - theme.ts: Complete theme configuration combining all tokens
   - navigation.ts: Routes, menu items, navigation structure

2. CSS VARIABLES (app/globals.css)
   - All design tokens are exposed as CSS variables
   - Automatic dark mode support
   - Tailwind integration via @theme

3. UI COMPONENTS (components/ui/)
   - button-base.tsx: Reusable button with variants
   - input-base.tsx: Reusable input with variants
   - badge-base.tsx: Status badges and labels
   - price-display.tsx: Product price with discount
   - rating-stars.tsx: Product rating visualization
   - skeleton-loader.tsx: Loading states
   - empty-state.tsx: Empty/error states
   - section-header.tsx: Section titles and headers

4. FEATURE COMPONENTS (components/)
   - FlipkartProductCard.tsx: Product card in multiple variants
   - FlipkartHeader.tsx: Main navigation header
   - CategoryNavigation.tsx: Category menu
   - (Other existing components)

5. TYPES (lib/types.ts)
   - Extend with ButtonProps, InputProps, CardProps, etc.
   - Keep in sync with component APIs
*/

// ============================================================================
// COLOR PALETTE REFERENCE
// ============================================================================

/*
PRIMARY COLORS:
- Primary Blue: #2874F0 (Flipkart signature)
- Dark Blue Hover: #1F5DC9
- Yellow Accent: #FFE500

BACKGROUNDS:
- Default: #F1F3F6 (light ecommerce background)
- Surface: #FFFFFF (cards, inputs)
- Hover: #FAFAFA

TEXT:
- Primary: #212121 (main text)
- Secondary: #878787 (helper text)
- Disabled: #BDBDBD

SEMANTIC:
- Success: #388E3C
- Error: #D32F2F
- Warning: #F57C00
- Info: #1976D2

USAGE:
const { COLORS } = require('@/constants/colors');
color: COLORS.primary.main;
backgroundColor: COLORS.success.main;
*/

// ============================================================================
// TYPOGRAPHY GUIDELINES
// ============================================================================

/*
FONT STACKS:
- Primary: Roboto, Inter, sans-serif (body, UI)
- Mono: Roboto Mono, monospace (code, technical)

PRESET STYLES (from constants/typography.ts):
- h1-h6: Heading styles
- body, bodySmall, bodyXSmall: Body text
- productTitle: 14px, weight 500
- productPrice: 18px, bold (price display)
- label: 12px, medium (labels)
- button: 16px, medium (button text)
- nav, navSmall: Navigation items
- caption, overline: Small text, meta

USAGE:
import { getTailwindClass } from '@/constants/typography';

<h1 className={getTailwindClass('h1')}>Title</h1>
<p className={getTailwindClass('body')}>Body text</p>
<span className={getTailwindClass('label')}>Label</span>
*/

// ============================================================================
// SPACING SCALE
// ============================================================================

/*
Based on 8px baseline:

0 - 0px
1 - 4px
2 - 8px
3 - 12px
4 - 16px
5 - 20px
6 - 24px
8 - 32px
12 - 48px
16 - 64px

USAGE IN TAILWIND:
- p-2 = 8px padding
- gap-4 = 16px gap
- mb-6 = 24px margin-bottom

USAGE IN CSS:
import { SPACING } from '@/constants/layout';
padding: SPACING[4]; // 16px
marginBottom: SPACING[6]; // 24px
*/

// ============================================================================
// RESPONSIVE DESIGN
// ============================================================================

/*
BREAKPOINTS:
- Mobile: 0-640px (xs-sm)
- Tablet: 641px-1024px (md)
- Desktop: 1025px+ (lg-2xl)

USAGE:
1. Mobile-first approach (default mobile styles)
2. Add lg: or md: classes for larger screens
3. Use hidden/block utilities

EXAMPLES:
<div className="hidden lg:block">Desktop only</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  Grid (1 col mobile, 2 tablet, 4 desktop)
</div>

GRID SYSTEM:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 4 columns
- Gap: 16px (desktop), 12px (tablet), 8px (mobile)
*/

// ============================================================================
// COMPONENT USAGE EXAMPLES
// ============================================================================

/*
BUTTON COMPONENT:

import { Button } from '@/components';

<Button variant="primary" size="md" fullWidth>
  Click Me
</Button>

Variants: primary | secondary | ghost | outline | danger
Sizes: sm | md | lg
Props: loading, disabled, fullWidth, onClick

---

INPUT COMPONENT:

import { Input } from '@/components';

<Input
  type="text"
  placeholder="Search..."
  value={query}
  onChange={(val) => setQuery(val)}
  variant="default"
  error={error}
  size="md"
/>

Variants: default | outlined | filled
Sizes: sm | md | lg

---

PRICE DISPLAY:

import { PriceDisplay } from '@/components';

<PriceDisplay
  originalPrice={1999}
  salePrice={1299}
  showDiscount={true}
  size="md"
/>

Output: ₹1,299  ₹1,999  35% off

---

RATING STARS:

import { RatingStars } from '@/components';

<RatingStars
  rating={4.5}
  totalReviews={234}
  size="md"
  interactive={false}
/>

Output: ★★★★☆ 4.5 (234)

---

PRODUCT CARD:

import { FlipkartProductCard } from '@/components';

<FlipkartProductCard
  product={product}
  variant="grid"
  isWishlisted={false}
  isLoading={false}
  onAddToCart={handleAdd}
  onWishlist={handleWishlist}
/>

Variants: grid | list | compact

---

BADGE:

import { Badge } from '@/components';

<Badge variant="success" size="md" text="In Stock" />
<Badge variant="error" size="sm" text="50% off" />

Variants: primary | secondary | success | error | warning | info
Sizes: sm | md | lg

---

SKELETON LOADER:

import { SkeletonLoader } from '@/components';

<SkeletonLoader
  count={4}
  variant="rect"
  height={200}
  spacing="md"
/>

Variants: rect | circle | text

---

EMPTY STATE:

import { EmptyState } from '@/components';

<EmptyState
  type="search"
  title="No Products Found"
  description="Try adjusting your search terms"
  action={{
    label: "Back to Shopping",
    onClick: handleBack
  }}
/>

---

SECTION HEADER:

import { SectionHeader } from '@/components';

<SectionHeader
  title="Featured Products"
  subtitle="Hand-picked bestsellers"
  action={{
    label: "View All",
    href: "/products"
  }}
/>
*/

// ============================================================================
// DESIGN PATTERNS & BEST PRACTICES
// ============================================================================

/*
1. CONSISTENT SPACING:
   - Use SPACING tokens consistently
   - Maintain 8px baseline
   - Never use arbitrary values

2. COLOR USAGE:
   - Use COLORS tokens, not hardcoded hex
   - Respect light/dark modes (CSS variables)
   - Use semantic colors (success, error, warning)

3. TYPOGRAPHY:
   - Use preset styles for consistency
   - Maintain visual hierarchy
   - Use weight 600+ for headings
   - Use weight 400-500 for body text

4. RESPONSIVE DESIGN:
   - Mobile-first approach
   - Test all breakpoints
   - Ensure touch-friendly (min 44px height)
   - Test on actual devices

5. COMPONENT REUSABILITY:
   - Never hardcode styles in components
   - Use variant system for variations
   - Keep components small and focused
   - Export from components/index.ts

6. DARK MODE:
   - Use CSS variables (automatic)
   - Test in dark mode
   - Sufficient contrast (WCAG AA)
   - Use tailwind's dark: prefix

7. ACCESSIBILITY:
   - Semantic HTML (button, form, nav, etc.)
   - ARIA labels where needed
   - Keyboard navigation
   - Color contrast ratios
   - Focus states

8. PERFORMANCE:
   - Lazy load images
   - Code split components
   - Optimize bundle size
   - Use React.forwardRef for refs
   - Memoize where needed

9. TYPE SAFETY:
   - Always define component props
   - Use lib/types.ts for interfaces
   - Extend ButtonProps, InputProps, etc.
   - Validate data with zod

10. ERROR HANDLING:
    - Show error messages
    - Use error variant for inputs
    - Display empty states
    - Handle loading states
*/

// ============================================================================
// CREATING NEW COMPONENTS
// ============================================================================

/*
TEMPLATE:

'use client';

import React from 'react';
import clsx from 'clsx';
import type { CustomComponentProps } from '@/lib/types';

const CustomComponent = React.forwardRef<HTMLDivElement, CustomComponentProps>(
  ({ variant = 'default', size = 'md', className, ...rest }, ref) => {
    const baseStyles = 'inline-flex items-center transition-all duration-200';
    
    const variantStyles = {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
    };
    
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };
    
    return (
      <div
        ref={ref}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...rest}
      />
    );
  }
);

CustomComponent.displayName = 'CustomComponent';

export default CustomComponent;

KEY POINTS:
- Use React.forwardRef for component ref support
- Use 'use client' for interactive components
- Use clsx for conditional styling
- Define variants as objects
- Export from components/index.ts
- Add displayName for debugging
- Document props with JSDoc
*/

// ============================================================================
// FILE ORGANIZATION
// ============================================================================

/*
PROJECT STRUCTURE:

components/
├── ui/                          # Design system components
│   ├── button-base.tsx
│   ├── input-base.tsx
│   ├── badge-base.tsx
│   ├── price-display.tsx
│   ├── rating-stars.tsx
│   ├── skeleton-loader.tsx
│   ├── empty-state.tsx
│   ├── section-header.tsx
│   └── index.ts                # Export all design system components
├── FlipkartProductCard.tsx      # Feature component
├── FlipkartHeader.tsx           # Feature component
├── CategoryNavigation.tsx       # Feature component
├── index.ts                     # Export all components
├── ProductCard.tsx             # Existing component (can refactor)
├── Header.tsx                  # Existing component (can refactor)
└── ...other components

constants/
├── colors.ts                   # Color palette
├── typography.ts              # Font system
├── layout.ts                  # Spacing, breakpoints
├── theme.ts                   # Complete theme
└── navigation.ts              # Routes, menu items

lib/
├── types.ts                   # All interfaces
├── utils.ts                   # Helper functions
├── constants.ts               # App constants
└── api-service.ts            # API calls

app/
├── globals.css                # Design system CSS variables
├── layout.tsx                 # Root layout with fonts
├── page.tsx                   # Home page
└── ...pages

styles/
├── globals.css               # (deprecated, use app/globals.css)
*/

// ============================================================================
// COMMON USE CASES
// ============================================================================

/*
PRODUCT LISTING PAGE:

import { FlipkartProductCard, SkeletonLoader, EmptyState } from '@/components';

function ProductPage() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchProducts().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <SkeletonLoader key={i} count={1} variant="rect" height={300} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <EmptyState type="no-items" title="No products found" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <FlipkartProductCard
          key={product.id}
          product={product}
          variant="grid"
        />
      ))}
    </div>
  );
}

---

FORM WITH VALIDATION:

import { Button, Input, Badge } from '@/components';

function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      await loginUser(email);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={setEmail}
        error={error}
        variant="default"
      />
      <Button
        variant="primary"
        fullWidth
        loading={loading}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </div>
  );
}
*/

// ============================================================================
// TROUBLESHOOTING
// ============================================================================

/*
ISSUE: Components not styled correctly
SOLUTION: 
- Check if globals.css is imported in layout.tsx
- Verify CSS variables are set in :root
- Check tailwind.config.js includes content paths

ISSUE: Dark mode not working
SOLUTION:
- Add 'dark' class to html element
- Use dark: prefix in classes
- CSS variables are automatically handled

ISSUE: Responsive classes not working
SOLUTION:
- Use mobile-first approach (default mobile)
- Add md: and lg: for larger screens
- Check breakpoint values in constants/layout.ts

ISSUE: Component TypeScript errors
SOLUTION:
- Import types from lib/types.ts
- Check prop interfaces match component
- Use React.forwardRef for ref support

ISSUE: Performance is slow
SOLUTION:
- Use SkeletonLoader for loading states
- Implement lazy loading for images
- Split code with dynamic imports
- Memoize expensive components
*/

// ============================================================================
// MIGRATION GUIDE (From Old to New Components)
// ============================================================================

/*
OLD: <button className="bg-blue-500 text-white">
NEW: <Button variant="primary">

OLD: <input className="border border-gray-300">
NEW: <Input variant="default">

OLD: <span className="text-red-500">50% off</span>
NEW: <Badge variant="error" text="50% off">

OLD: Custom star implementation
NEW: <RatingStars rating={4.5} totalReviews={230}>

OLD: Custom price display
NEW: <PriceDisplay salePrice={999} originalPrice={1999}>

OLD: ProductCard with inline styles
NEW: <FlipkartProductCard product={product}>

MIGRATION STEPS:
1. Replace hardcoded colors with COLORS constants
2. Replace font sizes with TYPOGRAPHY presets
3. Replace custom button with Button component
4. Replace custom inputs with Input component
5. Update spacing to use SPACING tokens
6. Add responsive classes for different breakpoints
7. Test in light and dark modes
8. Verify accessibility
*/

export const DESIGN_SYSTEM_INITIALIZED = true;
