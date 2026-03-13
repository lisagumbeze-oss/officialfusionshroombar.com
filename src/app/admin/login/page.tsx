'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push('/admin');
                router.refresh();
            } else {
                setError('Invalid administrative password.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.loginContainer}>
            <div className={`${styles.loginCard} glass-morphism`}>
                <div className={styles.iconCircle}>
                    <Lock size={32} />
                </div>
                <h1>Admin Access</h1>
                <p>Enter the master password to continue to the Command Center.</p>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input 
                            type="password" 
                            placeholder="Master Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" disabled={loading} className="premium-gradient">
                        {loading ? 'AUTHENTICATING...' : 'ENTER DASHBOARD'}
                    </button>
                </form>
            </div>
        </div>
    );
}
