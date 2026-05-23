/**
 * Complete Theme Configuration
 * Centralizes all design tokens and theme settings
 */

import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';
import { SPACING, BREAKPOINTS, BORDER_RADIUS, SHADOWS, Z_INDEX } from './layout';

export const THEME = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  breakpoints: BREAKPOINTS,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
  zIndex: Z_INDEX,

  // Component Defaults
  components: {
    button: {
      primary: {
        background: COLORS.primary.main,
        color: COLORS.text.inverse,
        hoverBackground: COLORS.primary.hover,
        borderRadius: BORDER_RADIUS.md,
        padding: `${SPACING[2]} ${SPACING[4]}`,
        fontSize: TYPOGRAPHY.fontSize.base,
        fontWeight: TYPOGRAPHY.fontWeight.medium,
      },
      secondary: {
        background: COLORS.neutral[100],
        color: COLORS.text.primary,
        hoverBackground: COLORS.neutral[200],
        borderRadius: BORDER_RADIUS.md,
        padding: `${SPACING[2]} ${SPACING[4]}`,
        fontSize: TYPOGRAPHY.fontSize.base,
        fontWeight: TYPOGRAPHY.fontWeight.medium,
      },
      ghost: {
        background: 'transparent',
        color: COLORS.primary.main,
        hoverBackground: COLORS.primary.lighter,
        borderRadius: BORDER_RADIUS.md,
        padding: `${SPACING[2]} ${SPACING[4]}`,
        fontSize: TYPOGRAPHY.fontSize.base,
        fontWeight: TYPOGRAPHY.fontWeight.medium,
      },
    },

    input: {
      background: COLORS.background.surface,
      borderColor: COLORS.border.default,
      focusBorderColor: COLORS.primary.main,
      borderRadius: BORDER_RADIUS.md,
      padding: `${SPACING[2]} ${SPACING[3]}`,
      fontSize: TYPOGRAPHY.fontSize.base,
      minHeight: '40px',
    },

    card: {
      background: COLORS.background.surface,
      borderColor: COLORS.border.default,
      borderRadius: BORDER_RADIUS.lg,
      shadow: SHADOWS.card,
      padding: SPACING[4],
    },

    badge: {
      padding: `${SPACING[1]} ${SPACING[2]}`,
      borderRadius: BORDER_RADIUS.full,
      fontSize: TYPOGRAPHY.fontSize.xs,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
    },

    productCard: {
      background: COLORS.background.surface,
      borderRadius: BORDER_RADIUS.lg,
      shadow: SHADOWS.card,
      shadowHover: SHADOWS.hover,
      padding: SPACING[3],
    },
  },

  // Animation Presets
  animations: {
    fadeIn: 'fadeIn 0.3s ease-in-out',
    slideUp: 'slideUp 0.3s ease-out',
    slideDown: 'slideDown 0.3s ease-out',
    slideLeft: 'slideLeft 0.3s ease-out',
    slideRight: 'slideRight 0.3s ease-out',
    scaleIn: 'scaleIn 0.2s ease-out',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    shimmer: 'shimmer 2s infinite',
  },
} as const;

/**
 * Light Theme (Default)
 */
export const LIGHT_THEME = {
  ...THEME,
  isDark: false,
  colors: {
    ...COLORS,
    background: {
      ...COLORS.background,
      default: '#F1F3F6',
      surface: '#FFFFFF',
    },
    text: {
      ...COLORS.text,
      primary: '#212121',
      secondary: '#878787',
    },
  },
} as const;

/**
 * Dark Theme (Optional)
 */
export const DARK_THEME = {
  ...THEME,
  isDark: true,
  colors: {
    ...COLORS,
    primary: {
      ...COLORS.primary,
      main: '#4A90FF',
      hover: '#6BA3FF',
    },
    background: {
      default: '#121212',
      surface: '#1E1E1E',
      hover: '#262626',
      disabled: '#2C2C2C',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      disabled: '#757575',
      inverse: '#212121',
    },
    border: {
      default: '#383838',
      light: '#2C2C2C',
      dark: '#4A4A4A',
    },
  },
} as const;

/**
 * Theme utilities
 */
export const getTheme = (isDark: boolean = false) => {
  return isDark ? DARK_THEME : LIGHT_THEME;
};

export const getComponentStyle = (
  component: keyof typeof THEME.components,
  variant: string = 'primary',
  isDark: boolean = false
) => {
  const theme = getTheme(isDark);
  return (theme.components[component] as any)?.[variant] || {};
};
