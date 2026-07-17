export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Drive With Us', href: '/drive-with-us' },
  { label: 'Carriers', href: '/carrier' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Request a Quote', href: '/request-a-quote' },
  { label: 'Drive With Us', href: '/drive-with-us' },
  { label: 'Carriers', href: '/carrier' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms' },
];
