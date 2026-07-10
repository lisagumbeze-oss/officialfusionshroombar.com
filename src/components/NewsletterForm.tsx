'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import styles from '@/app/blog/page.module.css';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setEmail('');
        setMessage('You are subscribed. Check your inbox for a welcome email.');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <form className={styles.newsletterForm} onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        className={styles.newsletterInput}
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === 'submitting'}
      />
      <button
        type="submit"
        className={`btn btn-primary ${styles.newsletterBtn}`}
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Subscribing…' : 'Subscribe'} <Mail size={14} />
      </button>
      {message ? (
        <p
          style={{
            width: '100%',
            margin: '12px 0 0',
            fontSize: '0.9rem',
            color: status === 'error' ? '#c62828' : 'var(--text-muted)',
          }}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
