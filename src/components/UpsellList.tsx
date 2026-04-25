'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import styles from './upsell.module.css';

const RECOMMENDATIONS = [
    { id: 'guide-1', name: 'Microdose Guide', price: 9.99, image: '/images/products/guide.jpg', category: 'Digital' },
    { id: 'elite-1', name: 'Fusion Elite 5g', price: 65.00, image: '/images/products/elite.jpg', category: 'Premium' },
];

export default function UpsellList() {
    const { addToCart } = useCart();

    return (
        <div className={styles.container}>
            <h4 className={styles.title}>PEOPLE ALSO BOUGHT</h4>
            <div className={styles.list}>
                {RECOMMENDATIONS.map((product) => (
                    <div key={product.id} className={styles.upsellItem}>
                        <div className={styles.imageWrapper}>
                            <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
                        </div>
                        <div className={styles.info}>
                            <span className={styles.name}>{product.name}</span>
                            <span className={styles.price}>${product.price.toFixed(2)}</span>
                        </div>
                        <button 
                            className={styles.addBtn}
                            onClick={() => addToCart({ ...product, quantity: 1 } as any)}
                            aria-label={`Add ${product.name} to cart`}
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
