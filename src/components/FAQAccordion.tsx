'use client';

import { useState } from 'react';
import styles from './FAQAccordion.module.css';

interface FAQAccordionProps {
    question: string;
    answer: string;
}

export function FAQAccordion({ question, answer }: FAQAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
            <button 
                className={styles.question} 
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span>{question}</span>
                <span className={`material-symbols-outlined ${styles.icon}`}>
                    {isOpen ? 'remove' : 'add'}
                </span>
            </button>
            <div className={styles.answerWrapper}>
                <div className={styles.answer}>
                    {answer}
                </div>
            </div>
        </div>
    );
}
