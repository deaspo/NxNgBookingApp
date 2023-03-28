export interface NavItem {
    name: string;
    href: string;
}

export const Navigation: NavItem[] = [
    { name: 'Dashboard', href: '/home' },
    { name: 'Bookings', href: '/bookings' },
    { name: 'Locations', href: '/locations' },
    { name: 'FAQ', href: '/faq' }
]