'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './Reveal.module.css';

interface RevealProps {
    children: React.ReactNode;
    width?: 'fit-content' | '100%';
    delay?: number;
}

export const Reveal = ({ children, width = '100%', delay = 0 }: RevealProps) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div 
            ref={ref} 
            className={`${styles.reveal} ${isVisible ? styles.visible : ''}`}
            style={{ 
                width,
                transitionDelay: `${delay}s`
            }}
        >
            {children}
        </div>
    );
};
