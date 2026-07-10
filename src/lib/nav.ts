export type NavLink = {
  href: string;
  label: string;
  description?: string;
};

export type NavItem = NavLink & {
  children?: NavLink[];
};

export const HEADER_NAV: NavItem[] = [
  { href: '/shop', label: 'Shop' },
  { href: '/track', label: 'Track order' },
  { href: '/about', label: 'About' },
  {
    href: '/microdosing-chocolate',
    label: 'Guides',
    description: 'Expert guides on dosing, products, and safe buying.',
    children: [
      {
        href: '/microdosing-chocolate',
        label: 'Microdosing guide',
        description: 'Protocols, dosage, and daily microdosing tips.',
      },
      {
        href: '/mushroom-chocolate-bars',
        label: 'Mushroom chocolate bars',
        description: 'How edibles work and what to expect.',
      },
      {
        href: '/buy-shroom-bars',
        label: 'Where to buy',
        description: 'Find authentic fusion bars online safely.',
      },
      {
        href: '/neau-tropics',
        label: 'Neau Tropics',
        description: 'Premium tropical fusion bar collection.',
      },
    ],
  },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export function isNavActive(pathname: string | null, href: string, children?: NavLink[]): boolean {
  if (!pathname) return false;

  if (pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))) {
    return true;
  }

  return children?.some((child) => isNavActive(pathname, child.href)) ?? false;
}
