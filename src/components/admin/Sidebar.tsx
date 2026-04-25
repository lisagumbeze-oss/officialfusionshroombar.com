'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    LayoutDashboard, 
    FileText, 
    Layers, 
    Image as ImageIcon, 
    MessageSquare,
    Package,
    ShoppingBag,
    Settings,
    LogOut,
    Tag,
    Users,
    BarChart2,
    Globe
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import styles from './Sidebar.module.css';

interface NavItem {
    label: string;
    href: string;
    icon: LucideIcon;
    badgeKey?: string;
}

interface NavGroup {
    label: string;
    items: NavItem[];
}

export default function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
    const pathname = usePathname();
    const [pendingOrders, setPendingOrders] = useState<number>(0);

    useEffect(() => {
        const fetchPendingCount = async () => {
            try {
                const res = await fetch('/api/admin/orders?status=PENDING');
                const data = await res.json();
                setPendingOrders(data.length || 0);
            } catch (error) {
                console.error('Failed to fetch pending orders:', error);
            }
        };
        fetchPendingCount();
        const interval = setInterval(fetchPendingCount, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    const navGroups: NavGroup[] = [
        {
            label: 'STORE MANAGEMENT',
            items: [
                { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
                { label: 'Products', href: '/admin/products', icon: Package },
                { label: 'Orders', href: '/admin/orders', icon: ShoppingBag, badgeKey: 'orders' },
                { label: 'Customers', href: '/admin/customers', icon: Users },
            ]
        },
        {
            label: 'CONTENT MANAGEMENT',
            items: [
                { label: 'All Posts', href: '/admin/blog', icon: FileText },
                { label: 'Categories', href: '/admin/categories', icon: Layers },
                { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
                { label: 'Comments', href: '/admin/comments', icon: MessageSquare },
            ]
        },
        {
            label: 'MARKETING',
            items: [
                { label: 'Coupons', href: '/admin/coupons', icon: Tag },
                { label: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
            ]
        },
        {
            label: 'SYSTEM',
            items: [
                { label: 'Settings', href: '/admin/settings', icon: Settings },
                { label: 'Live Site', href: '/', icon: Globe },
            ]
        },
    ];

    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <div className={styles.logoContainer}>
                <div className={styles.logoIcon}>
                    <Package size={20} />
                </div>
                <span className={styles.logoText}>Fusion Admin</span>
                {onClose && (
                    <button className={styles.mobileClose} onClick={onClose}>
                        <LogOut size={20} style={{ transform: 'rotate(180deg)' }} />
                    </button>
                )}
            </div>

            {navGroups.map((group) => (
                <div key={group.label}>
                    <div className={styles.sectionLabel}>{group.label}</div>
                    <nav className={styles.nav}>
                        {group.items.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href || 
                                (pathname.startsWith(item.href) && item.href !== '/admin' && item.href !== '/');
                            
                            const badge = item.badgeKey === 'orders' && pendingOrders > 0 ? pendingOrders.toString() : null;

                            return (
                                <Link 
                                    key={item.href} 
                                    href={item.href} 
                                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                                    onClick={() => { if (onClose) onClose(); }}
                                    target={item.href === '/' ? '_blank' : undefined}
                                >
                                    <Icon size={18} />
                                    <span>{item.label}</span>
                                    {badge && <span className={styles.navBadge}>{badge}</span>}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            ))}

            <div className={styles.footer}>
                <div className={styles.storageCard}>
                    <div className={styles.storageLabel}>
                        <span>Storage Status</span>
                        <span>7.2 GB of 10 GB used</span>
                    </div>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: '72%' }} />
                    </div>
                </div>
            </div>
        </aside>
    );
}
