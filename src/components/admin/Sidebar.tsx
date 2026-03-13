'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut, FileText, Menu, X } from 'lucide-react';
import { useState } from 'react';
import styles from './Sidebar.module.css';
import Image from 'next/image';

const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/logout', { method: 'POST' });
            router.push('/admin/login');
            router.refresh();
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <>
            <button className={styles.mobileToggle} onClick={toggleSidebar}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <Link href="/" className={styles.logo} onClick={() => setIsOpen(false)}>
                    <Package size={24} className={styles.logoIcon} />
                    <span className={styles.logoText}>FUSION ADMIN</span>
                </Link>

                <nav className={styles.nav}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
                        
                        return (
                            <Link 
                                key={item.href} 
                                href={item.href} 
                                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <button className={styles.logoutBtn} onClick={handleLogout}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </aside>
            
            {isOpen && <div className={styles.overlay} onClick={toggleSidebar} />}
        </>
    );
}
