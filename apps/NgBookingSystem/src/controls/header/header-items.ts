export interface NavItem {
    name: string;
    href: string;
    current: boolean;
}

export const Navigation: NavItem[] = [
    { name: 'Dashboard', href: '/', current: true },
    { name: 'Bookings', href: '/bookings', current: false },
    { name: 'Locations', href: '/locations', current: false },
    { name: 'FAQ', href: '/faq', current: false }
]