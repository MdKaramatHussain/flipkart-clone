/**
 * Layout System
 * Spacing, breakpoints, and responsive grid configuration
 */

// Spacing Scale (8px baseline)
export const SPACING = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
} as const;

// Breakpoints (Mobile-first approach)
export const BREAKPOINTS = {
  xs: '0px', // Extra small (mobile)
  sm: '640px', // Small (tablet)
  md: '768px', // Medium (small desktop)
  lg: '1024px', // Large (desktop)
  xl: '1280px', // Extra large
  '2xl': '1536px', // 2x Extra large
} as const;

// Responsive Container Widths
export const CONTAINER_WIDTH = {
  xs: '100%', // 0px
  sm: '540px', // 640px
  md: '720px', // 768px
  lg: '960px', // 1024px
  xl: '1140px', // 1280px
  '2xl': '1320px', // 1536px
} as const;

// Grid Configuration
export const GRID = {
  columns: {
    mobile: 1,
    tablet: 2,
    desktop: 4,
    wide: 5,
  },
  gap: {
    mobile: '8px',
    tablet: '12px',
    desktop: '16px',
  },
} as const;

// Content Padding
export const CONTENT_PADDING = {
  mobile: SPACING[3],
  tablet: SPACING[4],
  desktop: SPACING[6],
} as const;

// Product Grid Configuration
export const PRODUCT_GRID = {
  mobile: {
    columns: 1,
    gap: '8px',
  },
  tablet: {
    columns: 2,
    gap: '12px',
  },
  desktop: {
    columns: 4,
    gap: '16px',
  },
  wide: {
    columns: 5,
    gap: '16px',
  },
} as const;

// Header Heights
export const HEADER_HEIGHT = {
  mobile: '56px',
  tablet: '64px',
  desktop: '72px',
} as const;

// Sidebar Widths
export const SIDEBAR_WIDTH = {
  mobile: '80%',
  tablet: '280px',
  desktop: '280px',
} as const;

// Z-Index Scale
export const Z_INDEX = {
  hide: -1,
  auto: 'auto',
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modal_backdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  notification: 1700,
} as const;

// Border Radius Scale
export const BORDER_RADIUS = {
  none: '0',
  xs: '2px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '10px',
  '2xl': '12px',
  '3xl': '16px',
  full: '9999px',
} as const;

// Shadow System
export const SHADOWS = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  card: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  hover: '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
} as const;

// Transitions & Animations
export const TRANSITIONS = {
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  timing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;

// Media Query Helpers
export const media = {
  xs: `@media (min-width: ${BREAKPOINTS.xs})`,
  sm: `@media (min-width: ${BREAKPOINTS.sm})`,
  md: `@media (min-width: ${BREAKPOINTS.md})`,
  lg: `@media (min-width: ${BREAKPOINTS.lg})`,
  xl: `@media (min-width: ${BREAKPOINTS.xl})`,
  '2xl': `@media (min-width: ${BREAKPOINTS['2xl']})`,
  mobile: `@media (max-width: 639px)`,
  tablet: `@media (min-width: 640px) and (max-width: 1023px)`,
  desktop: `@media (min-width: 1024px)`,
} as const;

/**
 * Responsive Utility Functions
 */
export const getResponsiveValue = <T,>(
  values: Record<'mobile' | 'tablet' | 'desktop' | 'wide', T>,
  breakpoint: 'mobile' | 'tablet' | 'desktop' | 'wide'
): T => {
  return values[breakpoint];
};

export const getGridColumns = (breakpoint: 'mobile' | 'tablet' | 'desktop' | 'wide'): number => {
  return PRODUCT_GRID[breakpoint].columns;
};

export const getGridGap = (breakpoint: 'mobile' | 'tablet' | 'desktop' | 'wide'): string => {
  return PRODUCT_GRID[breakpoint].gap;
};
