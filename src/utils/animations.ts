import { Variants, Transition } from 'motion/react';

/**
 * Aurelia Jewels Luxury Animation Tokens & Variants
 * Editorial luxury timing:
 * - Micro-interactions: 150–250ms
 * - Hover transitions: 200–300ms
 * - Scroll reveals: 400–600ms
 * - Easing: Custom cubic-bezier for smooth deceleration
 */

export const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const GENTLE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const transitionFast: Transition = {
  duration: 0.2,
  ease: LUXURY_EASE,
};

export const transitionMedium: Transition = {
  duration: 0.35,
  ease: LUXURY_EASE,
};

export const transitionSlow: Transition = {
  duration: 0.55,
  ease: LUXURY_EASE,
};

// Fade In
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitionMedium,
  },
  exit: {
    opacity: 0,
    transition: transitionFast,
  },
};

// Subtle Fade In Up (small 12-16px movement for elegance)
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: LUXURY_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: transitionFast,
  },
};

// Stagger Container
export const staggerContainer = (
  staggerDelay = 0.08,
  delayChildren = 0.05
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

// Stagger Item
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: LUXURY_EASE,
    },
  },
};

// Scale & Fade In (Hero Image & Badges)
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: LUXURY_EASE,
    },
  },
};

// Chip Enter & Exit (for active filter badges)
export const chipAnimation: Variants = {
  initial: { opacity: 0, scale: 0.85, y: -4 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.22, ease: LUXURY_EASE },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.16, ease: LUXURY_EASE },
  },
};

// Smooth Accordion Expand / Collapse
export const accordionVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.28, ease: LUXURY_EASE },
      opacity: { duration: 0.18, ease: 'easeOut' },
    },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.32, ease: LUXURY_EASE },
      opacity: { duration: 0.25, delay: 0.05 },
    },
  },
};

// Drawer / Slide-Over (Right to Left)
export const drawerSlideRight: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      duration: 0.35,
      ease: LUXURY_EASE,
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.28,
      ease: LUXURY_EASE,
    },
  },
};

// Drawer Backdrop Fade
export const backdropFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

// Heart / Wishlist Pulse
export const heartPulse: Variants = {
  idle: { scale: 1 },
  active: {
    scale: [1, 1.25, 0.95, 1.05, 1],
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
};

// Subtle Card Elevation
export const cardElevation: Variants = {
  rest: {
    y: 0,
    transition: { duration: 0.3, ease: LUXURY_EASE },
  },
  hover: {
    y: -4,
    transition: { duration: 0.3, ease: LUXURY_EASE },
  },
};
