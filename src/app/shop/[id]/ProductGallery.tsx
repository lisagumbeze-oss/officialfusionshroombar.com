'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './product.module.css';

interface ProductGalleryProps {
    mainImage: string;
    gallery: string[] | null;
    name: string;
}

export default function ProductGallery({ mainImage, gallery, name }: ProductGalleryProps) {
    const images = [mainImage, ...(gallery || [])].filter(Boolean);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className={styles.imageGallery}>
            <div className={styles.mainImageWrapper}>
                <Image 
                    src={images[activeIndex]} 
                    alt={name} 
                    fill 
                    style={{ objectFit: 'cover' }} 
                    priority 
                    unoptimized={images[activeIndex].includes('data:image')}
                />
            </div>
            
            {images.length > 1 && (
                <div className={styles.thumbnails} role="group" aria-label="Product image thumbnails">
                    {images.map((img, idx) => (
                        <button 
                            key={idx} 
                            className={`${styles.thumbnail} ${idx === activeIndex ? styles.activeThumbnail : ''}`}
                            onClick={() => setActiveIndex(idx)}
                            aria-label={`View product image ${idx + 1}`}
                            aria-pressed={idx === activeIndex}
                        >
                            <Image 
                                src={img} 
                                alt="" 
                                fill 
                                style={{ objectFit: 'cover' }}
                                unoptimized={img.includes('data:image')}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
