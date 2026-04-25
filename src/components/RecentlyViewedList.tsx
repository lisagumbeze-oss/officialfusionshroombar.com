'use client';

import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import Image from 'next/image';
import Link from 'next/link';
import { Eye } from 'lucide-react';

export default function RecentlyViewedList({ excludeId }: { excludeId?: string }) {
    const { recentlyViewed } = useRecentlyViewed();
    const filteredList = recentlyViewed.filter(p => p.id !== excludeId);

    if (filteredList.length === 0) return null;

    return (
        <div style={{ marginTop: '4rem', padding: '2rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                <Eye size={20} color="#c9a44a" />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: 0 }}>Recently Viewed</h3>
            </div>
            
            <div style={{ 
                display: 'flex', 
                gap: '1.5rem', 
                overflowX: 'auto', 
                paddingBottom: '1rem',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(155, 77, 255, 0.3) transparent'
            }}>
                {filteredList.map((product) => (
                    <Link 
                        key={product.id} 
                        href={`/shop/${product.slug}`}
                        style={{ 
                            flex: '0 0 200px',
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: '16px',
                            padding: '1rem',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <div style={{ position: 'relative', width: '100%', aspectRatio: '1', borderRadius: '12px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                            <Image 
                                src={product.image} 
                                alt={product.name} 
                                fill 
                                style={{ objectFit: 'cover' }} 
                            />
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#c9a44a', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>{product.category}</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
                        <div style={{ fontWeight: 800, color: '#fff' }}>${product.price.toFixed(2)}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
