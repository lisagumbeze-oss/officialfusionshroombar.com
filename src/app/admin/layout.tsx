'use client';

import { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import styles from './admin.module.css';
import { Menu } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className={styles.adminLayout}>
            {/* Mobile Header */}
            <header className={styles.mobileHeader}>
                <button 
                    className={styles.menuToggle}
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <Menu size={24} />
                </button>
                <div className={styles.mobileLogo}>
                    <span>Fusion Admin</span>
                </div>
            </header>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            
            <main className={styles.mainContent}>
                {/* Backdrop for mobile */}
                {isSidebarOpen && (
                    <div 
                        className={styles.sidebarBackdrop} 
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
                {children}
            </main>
        </div>
    );
}
