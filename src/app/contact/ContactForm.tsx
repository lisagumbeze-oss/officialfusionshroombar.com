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
            <div className={styles.successMessage}>
                <h3>Thank you for reaching out!</h3>
                <p>We've received your message and will get back to you shortly at the provided email.</p>
                <button onClick={() => setStatus('idle')} className="premium-gradient">SEND ANOTHER MESSAGE</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" required placeholder="John Doe" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" required placeholder="john@example.com" />
                </div>
            </div>
            
            <div className={styles.formGroup}>
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" required placeholder="Inquiry about Wholesale" />
            </div>

            <div className={styles.formGroup}>
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
                {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
        </form>
    );
}
