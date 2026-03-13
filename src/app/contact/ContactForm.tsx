'use client';

import { useState } from 'react';
import styles from './contact.module.css';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
                setErrorMessage(result.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage('Network error. Please check your connection.');
        }
    };

    if (status === 'success') {
        return (
            <div className={styles.successContainer}>
                <div className={styles.successIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h3>Message Received!</h3>
                <p>We've received your inquiry and will reach out to you shortly at the provided email address.</p>
                <div style={{ marginTop: '2rem' }}>
                    <button onClick={() => setStatus('idle')} className="premium-gradient">SEND NEW MESSAGE</button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" required placeholder="John Doe" />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" required placeholder="john@example.com" />
                </div>
            </div>
            
            <div className={styles.inputGroup}>
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" required placeholder="Inquiry about Wholesale" />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" required placeholder="Your message here..." rows={6}></textarea>
            </div>

            {status === 'error' && (
                <div className={styles.errorBanner}>
                    {errorMessage}
                </div>
            )}

            <button 
                type="submit" 
                className={`${styles.submitBtn} premium-gradient`}
                disabled={status === 'submitting'}
            >
                {status === 'submitting' ? (
                    <span className={styles.loader}></span>
                ) : 'SEND MESSAGE'}
            </button>
        </form>
    );
}
