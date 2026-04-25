'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './shop.module.css';
import DosageCalculator from '@/components/DosageCalculator';

export default function ShopFilters({ categories }: { categories: string[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategory = searchParams.get('category') || 'All Products';
    const currentSort = searchParams.get('sort') || 'default';
    const currentQuery = searchParams.get('q') || '';
    const currentMinPrice = searchParams.get('min') || '0';
    const currentMaxPrice = searchParams.get('max') || '500';

    const [searchValue, setSearchValue] = useState(currentQuery);
    const [priceRange, setPriceRange] = useState({ min: currentMinPrice, max: currentMaxPrice });

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchValue !== currentQuery) {
                const params = new URLSearchParams(searchParams.toString());
                params.delete('page');
                if (searchValue) {
                    params.set('q', searchValue);
                } else {
                    params.delete('q');
                }
                router.push(`/shop?${params.toString()}`);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchValue, currentQuery, router, searchParams]);

    // Debounced price filter
    useEffect(() => {
        const timer = setTimeout(() => {
            if (priceRange.min !== currentMinPrice || priceRange.max !== currentMaxPrice) {
                const params = new URLSearchParams(searchParams.toString());
                params.delete('page');
                params.set('min', priceRange.min);
                params.set('max', priceRange.max);
                router.push(`/shop?${params.toString()}`);
            }
        }, 800);
        return () => clearTimeout(timer);
    }, [priceRange, currentMinPrice, currentMaxPrice, router, searchParams]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('page');
        if (e.target.value === 'All Products') {
            params.delete('category');
        } else {
            params.set('category', e.target.value);
        }
        router.push(`/shop?${params.toString()}`);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('page');
        if (e.target.value === 'default') {
            params.delete('sort');
        } else {
            params.set('sort', e.target.value);
        }
        router.push(`/shop?${params.toString()}`);
    };

    const removeFilter = (key: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('page');
        params.delete(key);
        if (key === 'q') setSearchValue('');
        router.push(`/shop?${params.toString()}`);
    };

    const clearAll = () => {
        setSearchValue('');
        router.push('/shop');
    };

    const hasFilters = currentCategory !== 'All Products' || currentQuery || currentSort !== 'default';

    return (
        <div className={styles.filters}>
            <div className={styles.filterControls}>
                <DosageCalculator />
                <div className={styles.searchContainer}>
                    <Search className={styles.searchIcon} size={18} />
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        className={styles.searchInput}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        aria-label="Search products"
                    />
                </div>

                <div className={styles.priceFilter}>
                    <label id="price-label">Max Price: <span>${priceRange.max}</span></label>
                    <input 
                        type="range" 
                        min="0" 
                        max="500" 
                        step="10"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                        className={styles.rangeInput}
                        aria-labelledby="price-label"
                    />
                </div>

                <div className={styles.filterGroups}>
                    <div className={styles.filterGroup}>
                        <label htmlFor="category-select">Category:</label>
                        <select 
                            id="category-select"
                            className="glass-morphism" 
                            value={currentCategory} 
                            onChange={handleCategoryChange}
                            aria-label="Filter by category"
                        >
                            <option>All Products</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.filterGroup}>
                        <label htmlFor="sort-select">Sort By:</label>
                        <select 
                            id="sort-select"
                            className="glass-morphism" 
                            value={currentSort} 
                            onChange={handleSortChange}
                            aria-label="Sort products"
                        >
                            <option value="default">Default sorting</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="newest">Newest First</option>
                        </select>
                    </div>
                </div>
            </div>

            {hasFilters && (
                <div className={styles.activeChips} role="list" aria-label="Active filters">
                    {currentCategory !== 'All Products' && (
                        <div className={styles.chip} role="listitem">
                            <span>Category: {currentCategory}</span>
                            <button 
                                onClick={() => removeFilter('category')} 
                                className={styles.removeChip}
                                aria-label={`Remove category filter: ${currentCategory}`}
                            >
                                <X size={12} />
                            </button>
                        </div>
                    )}
                    {currentQuery && (
                        <div className={styles.chip} role="listitem">
                            <span>Search: {currentQuery}</span>
                            <button 
                                onClick={() => removeFilter('q')} 
                                className={styles.removeChip}
                                aria-label={`Remove search filter: ${currentQuery}`}
                            >
                                <X size={12} />
                            </button>
                        </div>
                    )}
                    {currentSort !== 'default' && (
                        <div className={styles.chip} role="listitem">
                            <span>Sort: {currentSort}</span>
                            <button 
                                onClick={() => removeFilter('sort')} 
                                className={styles.removeChip}
                                aria-label="Remove sort filter"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    )}
                    <button onClick={clearAll} className={styles.clearAll} aria-label="Clear all filters">
                        Clear All
                    </button>
                </div>
            )}
        </div>
    );
}
