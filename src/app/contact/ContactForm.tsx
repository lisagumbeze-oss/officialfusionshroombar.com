'use client';

import { useState } from 'react';
import styles from './page.module.css';

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
        } catch {
            setStatus('error');
            setErrorMessage('Network error. Please check your connection.');
        }
    };

    if (status === 'success') {
        return (
            <div className={styles.successContainer}>
                <div className={styles.successIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <h3>Message received</h3>
                <p>
                    We&apos;ve received your inquiry and will reach out shortly at the email
                    address you provided.
                </p>
                <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="btn btn-primary"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                    <label htmlFor="name">Your name</label>
                    <input type="text" id="name" name="name" required placeholder="John Doe" />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" name="email" required placeholder="john@example.com" />
                </div>
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" placeholder="Question about order" />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="How can we help you?"
                    rows={6}
                />
            </div>

            {status === 'error' && <div className={styles.errorBanner}>{errorMessage}</div>}

            <button
                type="submit"
                className={`btn btn-primary ${styles.submitBtn}`}
                disabled={status === 'submitting'}
            >
                {status === 'submitting' ? 'Sending…' : 'Send message'}
            </button>
        </form>
    );
}
