'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from './shop.module.css';

interface PaginationProps {
    totalItems: number;
    pageSize: number;
    currentPage: number;
}

export default function Pagination({ totalItems, pageSize, currentPage }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const totalPages = Math.ceil(totalItems / pageSize);

    if (totalPages <= 1) return null;

    // Helper to create the destination URL
    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString());
        return `/shop?${params.toString()}`;
    };

    const handlePageChange = (page: number) => {
        router.push(createPageURL(page));
    };

    return (
        <div className={styles.pagination}>
            <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className={styles.pageBtn}
            >
                Previous
            </button>
            
            <div className={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`${styles.pageNumber} ${currentPage === page ? styles.activePage : ''}`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className={styles.pageBtn}
            >
                Next
            </button>
        </div>
    );
}
