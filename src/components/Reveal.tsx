'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './Reveal.module.css';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur';

interface RevealProps {
    children: React.ReactNode;
    width?: 'fit-content' | '100%';
    delay?: number;
    fill?: boolean;
    direction?: RevealDirection;
}

export const Reveal = ({
    children,
    width = '100%',
    delay = 0,
    fill = false,
    direction = 'up',
}: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reveal = () => setIsVisible(true);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) reveal();
            },
            {
                threshold: 0.08,
                rootMargin: '40px',
            }
        );

        observer.observe(el);

        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            reveal();
        }

        return () => observer.disconnect();
    }, []);

    const directionClass = styles[direction] ?? styles.up;

    return (
        <div
            ref={ref}
            className={`${styles.reveal} ${directionClass} ${fill ? styles.fill : ''} ${isVisible ? styles.visible : ''}`}
            style={{
                width,
                transitionDelay: `${delay}s`,
            }}
        >
            {children}
        </div>
    );
};
