/**
 * Flipkart-inspired Color Palette
 * Professional ecommerce color system with marketplace aesthetics
 */

export const COLORS = {
  // Primary Brand Colors - Flipkart Style
  primary: {
    main: '#2874F0', // Flipkart Blue
    hover: '#1D4ED8', // Hover Blue
    light: '#4A90FF',
    lighter: '#E8F1FF', // Light Blue Background
    dark: '#1047A0',
  },

  // Section Background Colors - Soft Pastels
  sections: {
    blue: '#E8F1FF', // Light Blue for sections
    green: '#DDF3EC', // Soft Green Section
    purple: '#E9E2FF', // Soft Purple Section
    gray: '#F1F3F6', // Light Gray Background
    white: '#FFFFFF', // White Cards
  },

  // Accent Colors
  accent: {
    yellow: '#FFE500', // Flipkart Yellow
    yellowHover: '#FFD700',
    orange: '#FF9500',
    green: '#31A24C', // Success green
  },

  // Status Colors
  success: {
    main: '#31A24C',
    light: '#DDF3EC',
    dark: '#1B5E20',
  },

  error: {
    main: '#D32F2F',
    light: '#FFEBEE',
    dark: '#B71C1C',
  },

  warning: {
    main: '#F57C00',
    light: '#FFF3E0',
    dark: '#E65100',
  },

  info: {
    main: '#1976D2',
    light: '#E3F2FD',
    dark: '#1565C0',
  },

  // Neutral Colors
  neutral: {
    black: '#000000',
    white: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // Background & Surface
  background: {
    default: '#F1F3F6', // Light ecommerce background
    surface: '#FFFFFF',
    hover: '#FAFAFA',
    disabled: '#F5F5F5',
  },

  // Text Colors
  text: {
    primary: '#212121', // Main text
    secondary: '#666666', // Secondary text
    disabled: '#BDBDBD',
    inverse: '#FFFFFF',
  },

  // Borders
  border: {
    default: '#E5E7EB', // Light border
    light: '#EEEEEE',
    dark: '#BDBDBD',
  },

  // Semantic Colors
  semantic: {
    price: '#2874F0', // Price color
    discount: '#FF6B6B', // Discount/savings
    verified: '#31A24C', // Verified badge
    featured: '#FFE500', // Featured/highlighted
    restricted: '#FF6B6B', // Restricted items
  },
} as const;

/**
 * Color Utilities
 */
export const getColorValue = (path: string): string => {
  const keys = path.split('.');
  let value: any = COLORS;
  for (const key of keys) {
    value = value?.[key];
  }
  return value || '#000000';
};

export const withOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
