'use client';

import { useWishlist } from '@/context/WishlistContext';
import Image from 'next/image';
import Link from 'next/link';
import styles from './wishlist.module.css';
import shopStyles from '../shop/shop.module.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import AddToCartButton from '@/components/AddToCartButton';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist();

    return (
        <div className={styles.pageWrapper}>
            <Header />
            <main className={styles.mainContent}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h1>My Wishlist</h1>
                        <p>Manage your favorite Fusion products</p>
                    </div>

                    {wishlist.length > 0 ? (
                        <div className={shopStyles.productGrid}>
                            {wishlist.map((product) => (
                                <div key={product.id} className={shopStyles.productCard}>
                                    <div className={shopStyles.productImagePlaceholder}>
                                        <Image 
                                            src={product.image} 
                                            alt={product.name} 
                                            fill 
                                            style={{ objectFit: 'cover' }} 
                                        />
                                        <button 
                                            className={styles.removeBtn} 
                                            onClick={() => removeFromWishlist(product.id)}
                                            title="Remove from wishlist"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <div className={shopStyles.productInfo}>
                                        <h3 className={shopStyles.productTitle}>{product.name}</h3>
                                        <div className={shopStyles.categoryTag}>{product.category}</div>
                                        <div className={shopStyles.price}>
                                            <span className={shopStyles.newPrice}>${product.price.toFixed(2)}</span>
                                        </div>
                                        <div className={shopStyles.buttonGroup}>
                                            <AddToCartButton product={product} className={`${shopStyles.cartBtn} premium-gradient`} />
                                            <Link href={`/shop/${product.slug}`} className={shopStyles.viewBtn}>
                                                VIEW
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>
                                <ShoppingBag size={48} />
                            </div>
                            <h2>Your wishlist is empty</h2>
                            <p>Browse our shop and add your favorite shroom bars to your wishlist!</p>
                            <Link href="/shop" className={`${styles.shopBtn} premium-gradient`}>
                                GO TO SHOP <ArrowRight size={18} />
                            </Link>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
