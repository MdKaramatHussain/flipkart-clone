/**
 * Typography System
 * Flipkart-inspired fonts, sizing, weights, and line heights
 */

export const TYPOGRAPHY = {
  // Font Families - Flipkart Style (Inter, Roboto, sans-serif)
  fonts: {
    primary: "'Inter', 'Roboto', sans-serif", // Main UI font
    secondary: "'Roboto', sans-serif", // Alternative
    mono: "'Roboto Mono', monospace",
  },

  // Font Sizes (in pixels)
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '32px',
    '5xl': '36px',
  },

  // Font Weights
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
  },

  // Preset Typography Styles
  styles: {
    // Headings
    h1: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.5px',
    },

    h2: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.3px',
    },

    h3: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0px',
    },

    h4: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0px',
    },

    h5: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0px',
    },

    h6: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '0px',
    },

    // Body Texts
    body: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0px',
    },

    bodySmall: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.2px',
    },

    bodyXSmall: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: '0.3px',
    },

    // Product Card Text
    productTitle: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0px',
    },

    productPrice: {
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '0px',
    },

    productOriginalPrice: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: '0px',
    },

    // Label & Badge
    label: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.3px',
    },

    // Button Text
    button: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0px',
    },

    buttonSmall: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0px',
    },

    // Navigation
    nav: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0px',
    },

    navSmall: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.2px',
    },

    // Caption & Helper Text
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: '0.4px',
    },

    overline: {
      fontSize: '11px',
      fontWeight: 600,
      lineHeight: 1.6,
      letterSpacing: '0.8px',
      textTransform: 'uppercase',
    },
  },
} as const;

/**
 * Typography Utility Functions
 */
export const getCSSStyles = (
  style: keyof typeof TYPOGRAPHY.styles
): React.CSSProperties => {
  const s = TYPOGRAPHY.styles[style];
  return {
    fontSize: s.fontSize,
    fontWeight: s.fontWeight,
    lineHeight: s.lineHeight,
    letterSpacing: s.letterSpacing,
  };
};

export const getTailwindClass = (style: keyof typeof TYPOGRAPHY.styles): string => {
  const styleMap: Record<string, string> = {
    h1: 'text-4xl font-bold leading-tight',
    h2: 'text-3xl font-bold leading-tight',
    h3: 'text-2xl font-semibold leading-snug',
    h4: 'text-xl font-semibold leading-snug',
    h5: 'text-lg font-semibold leading-normal',
    h6: 'text-base font-semibold leading-normal',
    body: 'text-base font-normal leading-normal',
    bodySmall: 'text-sm font-normal leading-normal',
    bodyXSmall: 'text-xs font-normal leading-relaxed',
    productTitle: 'text-sm font-medium leading-snug',
    productPrice: 'text-lg font-bold leading-tight',
    productOriginalPrice: 'text-sm font-normal leading-tight',
    label: 'text-xs font-medium leading-relaxed',
    button: 'text-base font-medium leading-normal',
    buttonSmall: 'text-sm font-medium leading-normal',
    nav: 'text-sm font-medium leading-normal',
    navSmall: 'text-xs font-medium leading-normal',
    caption: 'text-xs font-normal leading-relaxed',
    overline: 'text-xs font-semibold leading-loose uppercase',
  };

  return styleMap[style] || '';
};
