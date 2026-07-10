import Link from 'next/link';
import Image from 'next/image';
import { shouldUnoptimizeImage } from '@/lib/image';

interface RelatedProductsProps {
    products: any[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
    if (!products || products.length === 0) return null;

    return (
        <section style={{ marginTop: '4rem', borderTop: '1px solid var(--border)', paddingTop: '3rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--foreground)' }}>
                Recommended For You
            </h3>
            
            <div 
                className="related-grid"
                style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
                    gap: '1.5rem',
                    paddingBottom: '1rem'
                }}
            >
                <style dangerouslySetInnerHTML={{ __html: `
                    .related-card:hover { border-color: var(--border-strong) !important; box-shadow: var(--shadow-card); }
                    @media (max-width: 768px) {
                        .related-grid {
                            display: flex !important;
                            overflow-x: auto !important;
                            scroll-snap-type: x mandatory;
                            padding-bottom: 2rem;
                            gap: 1rem !important;
                        }
                        .related-card {
                            min-width: 240px !important;
                            scroll-snap-align: start;
                        }
                    }
                `}} />
                
                {products.map((p) => (
                    <Link 
                        key={p.id} 
                        href={`/shop/${p.slug}`}
                        className="related-card"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            background: 'var(--surface-elevated)',
                            borderRadius: '16px',
                            border: '1px solid var(--border)',
                            padding: '1rem',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <div style={{ 
                            position: 'relative', 
                            width: '100%', 
                            aspectRatio: '1', 
                            borderRadius: '12px', 
                            overflow: 'hidden',
                            marginBottom: '1rem',
                            background: 'var(--image-placeholder)'
                        }}>
                            <Image
                                src={p.image || '/images/hero-fusion.webp'}
                                alt={p.name}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="220px"
                                unoptimized={shouldUnoptimizeImage(p.image)}
                            />
                        </div>
                        <h4 style={{ 
                            fontSize: '0.9rem', 
                            fontWeight: 700, 
                            color: 'var(--foreground)', 
                            marginBottom: '0.25rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {p.name}
                        </h4>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {p.category}
                        </span>
                        
                        <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                                View Product
                            </span>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--foreground)' }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14m-7-7 7 7-7 7"/>
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
