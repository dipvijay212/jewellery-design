/**
 * Aurelia Jewels Design System Tokens
 * Comprehensive design tokens representing the brand's aesthetic:
 * warm bridal ivory, opulent champagne gold, rich imperial burgundy, and obsidian charcoal.
 */

export const colors = {
  ivory: {
    50: '#FDFBF7',
    100: '#FAF7F2', // Primary Warm Ivory canvas
    200: '#F3ECE1', // Soft card backgrounds
    300: '#E8DEC8', // Border highlights
    400: '#D9CCAE',
    500: '#C7B590',
  },
  champagne: {
    50: '#FCF9EE',
    100: '#F7F1D8',
    200: '#EFE2B0',
    300: '#E6D084',
    400: '#DFC063',
    500: '#D4AF37', // Signature Champagne Gold
    600: '#B89327', // Polished Yellow Gold
    700: '#93741E', // Antique Gold
    800: '#6F5617',
    900: '#4B3910',
  },
  burgundy: {
    50: '#FBF2F4',
    100: '#F5E0E4',
    200: '#ECC4CB',
    300: '#DE9DA7',
    400: '#C96B7B',
    500: '#A8384E',
    600: '#882438',
    700: '#6B1728',
    800: '#520F1D', // Royal Velvet Burgundy
    900: '#3D0A14', // Deep Imperial Wine
    950: '#26050B', // Midnight Noir Burgundy
  },
  charcoal: {
    50: '#F6F6F6',
    100: '#E7E7E7',
    200: '#D1D1D1',
    300: '#B0B0B0',
    400: '#888888',
    500: '#6D6D6D',
    600: '#525252',
    700: '#2C2C2C',
    800: '#1A1A1A',
    900: '#121212', // Obsidian Onyx
  },
  status: {
    success: '#1B6A47',
    warning: '#B8781B',
    error: '#9E2A2B',
    info: '#2D5B88',
  },
} as const;

export const typography = {
  fontFamilies: {
    serif: 'var(--font-serif), Cormorant Garamond, "Playfair Display", Georgia, serif',
    sans: 'var(--font-sans), Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.05em',
    wider: '0.1em',
    widest: '0.2em',
    luxury: '0.25em',
  },
} as const;

export const shadows = {
  subtle: '0 2px 10px -2px rgba(184, 147, 39, 0.08)',
  goldGlow: '0 0 25px rgba(212, 175, 55, 0.25)',
  goldGlowStrong: '0 0 35px rgba(212, 175, 55, 0.45)',
  burgundyGlow: '0 8px 30px rgba(82, 15, 29, 0.3)',
  cardElevated: '0 15px 35px -10px rgba(38, 5, 11, 0.08)',
  drawer: '0 25px 60px -15px rgba(18, 18, 18, 0.35)',
} as const;

export const borders = {
  hairlineGold: '1px solid rgba(212, 175, 55, 0.25)',
  subtleGold: '1px solid rgba(212, 175, 55, 0.45)',
  prominentGold: '2px solid rgba(212, 175, 55, 0.75)',
  subtleBurgundy: '1px solid rgba(82, 15, 29, 0.2)',
  subtleIvory: '1px solid rgba(243, 236, 225, 0.6)',
} as const;

export const radii = {
  none: '0px',
  sm: '2px', // Refined jewel cut radius
  md: '4px',
  lg: '8px',
  xl: '12px',
  full: '9999px',
} as const;

export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem',  // 8px
  md: '1rem',    // 16px
  lg: '1.5rem',  // 24px
  xl: '2rem',    // 32px
  '2xl': '3rem', // 48px
  '3xl': '4rem', // 64px
  '4xl': '6rem', // 96px
} as const;

export const designTokens = {
  colors,
  typography,
  shadows,
  borders,
  radii,
  spacing,
};

export type DesignTokens = typeof designTokens;
