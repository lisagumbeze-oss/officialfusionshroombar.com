'use client';

import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
    breadcrumbs: { label: string; active?: boolean }[];
}

export default function Header({ breadcrumbs }: HeaderProps) {
    return (
        <header style={{
            height: '70px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            background: 'rgba(13, 8, 20, 0.8)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            position: 'sticky',
            top: 0,
            zIndex: 40,
        }}>
            {/* Left: Breadcrumbs & Title */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    {breadcrumbs.map((crumb, i) => (
                        <React.Fragment key={crumb.label}>
                            <span style={{ 
                                fontSize: '10px', 
                                fontWeight: 600, 
                                color: crumb.active ? '#a855f7' : '#64748b',
                                textTransform: 'capitalize'
                            }}>
                                {crumb.label}
                            </span>
                            {i < breadcrumbs.length - 1 && <span style={{ color: '#334155', fontSize: '10px' }}>/</span>}
                        </React.Fragment>
                    ))}
                </nav>
            </div>

            {/* Middle: Nav Links (as seen in template) */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                {['Dashboard', 'Posts', 'Analytics', 'Settings'].map(item => (
                    <a 
                        key={item} 
                        href={`/admin/${item.toLowerCase()}`}
                        style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            color: item === 'Posts' ? '#fff' : '#64748b',
                            textDecoration: 'none',
                            position: 'relative'
                        }}
                    >
                        {item}
                        {item === 'Posts' && (
                            <span style={{
                                position: 'absolute',
                                bottom: '-26px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '20px',
                                height: '2px',
                                background: '#a855f7',
                                borderRadius: '99px'
                            }} />
                        )}
                    </a>
                ))}
            </nav>

            {/* Right: Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                    <input 
                        type="text" 
                        placeholder="Search posts..." 
                        style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '99px',
                            padding: '8px 16px 8px 40px',
                            fontSize: '12px',
                            color: '#fff',
                            width: '240px',
                            outline: 'none'
                        }}
                    />
                </div>
                
                <button style={{ background: 'none', color: '#64748b', position: 'relative' }}>
                    <Bell size={20} />
                    <span style={{ 
                        position: 'absolute', top: '-2px', right: '-2px', 
                        width: '8px', height: '8px', background: '#ec4899', 
                        borderRadius: '50%', border: '2px solid #0d0814' 
                    }} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px', borderRadius: '99px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <Image src="/admin-avatar.jpg" alt="User" width={32} height={32} />
                    </div>
                </div>
            </div>
        </header>
    );
}
