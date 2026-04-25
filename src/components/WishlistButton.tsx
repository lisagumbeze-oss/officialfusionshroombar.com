'use client';

import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { Heart } from 'lucide-react';
import styles from '@/app/shop/shop.module.css';

export default function WishlistButton({ product, className = "" }: { product: any, className?: string }) {
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { showToast } = useToast();
    const active = isInWishlist(product.id);

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
        if (!active) {
            showToast(`Added ${product.name} to wishlist!`, 'info');
        } else {
            showToast(`Removed ${product.name} from wishlist!`, 'info');
        }
    };

    return (
        <button 
            onClick={handleToggle} 
            className={`${styles.wishlistBtn} ${active ? styles.wishlistActive : ''} ${className}`}
            aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
        >
            <Heart size={18} fill={active ? "currentColor" : "none"} />
        </button>
    );
}
