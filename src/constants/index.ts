// Application constants and configuration

export const APP_NAME = 'OptimumSoft';
export const APP_DESCRIPTION = 'Transforming ideas into innovative software solutions';

// Navigation items
export const NAV_ITEMS = [
  { label: 'Services', path: '#services', isRoute: false },
  { label: 'Products', path: '/products', isRoute: true },
  { label: 'Technologies', path: '#tech', isRoute: false },
  { label: 'Portfolio', path: '/portfolio', isRoute: true },
  { label: 'Clients', path: '/clients', isRoute: true },
  { label: 'About', path: '/about', isRoute: true },
  { label: 'Contact', path: '#contact', isRoute: false },
  { label: 'Careers', path: '#contact', isRoute: false },
] as const;

// Social media links
export const SOCIAL_LINKS = {
  facebook: '#',
  twitter: '#',
  linkedin: '#',
  instagram: '#',
} as const;

// Contact information
export const CONTACT_INFO = {
  email: 'info@optimumsoft.com',
  phone: '+880 123 456 7890',
  address: 'Dhaka, Bangladesh',
} as const;

// Animation delays
export const ANIMATION_DELAYS = {
  fast: 100,
  normal: 200,
  slow: 300,
  stagger: 150,
} as const;

