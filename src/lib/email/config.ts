import { BASE_URL, BRAND_NAME } from '@/lib/keywords';

export const EMAIL_BRAND = {
  siteName: 'Fusion Shroom Bars',
  brandName: BRAND_NAME,
  siteUrl: BASE_URL,
  logoUrl: `${BASE_URL}/images.png`,
  supportEmail: 'order@officialfusionshroombar.com',
  tagline: 'Premium Quality • Discreet Shipping • 100% Authentic',
  colors: {
    background: '#faf8f5',
    card: '#fffcf8',
    surface: '#f3efe8',
    foreground: '#2c2419',
    muted: '#6b6459',
    subtle: '#8a8278',
    primary: '#0071e3',
    primaryDark: '#005bb5',
    border: '#e8e2d9',
    onPrimary: '#ffffff',
  },
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
} as const;

export const EMAIL_FROM = {
  orders: `Fusion Shroom Bars <order@officialfusionshroombar.com>`,
  contact: `Fusion Shroom Bars <order@officialfusionshroombar.com>`,
  notifications: `Fusion System <order@officialfusionshroombar.com>`,
} as const;

export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || 'order@officialfusionshroombar.com';
}

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function formatOrderId(orderId: string): string {
  return orderId.slice(-6).toUpperCase();
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
