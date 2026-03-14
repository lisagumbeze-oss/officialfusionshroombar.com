'use client';
// This file will remain 'use client'. I will create a layout.tsx for metadata.

import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';

export default function ContactPage() {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: JSON.stringify(data),
            });
            if (response.ok) {
                alert('Message sent! We will get back to you shortly.');
                (e.target as HTMLFormElement).reset();
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to send message.');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.heroSection}>
                <h1>Contact Us</h1>
                <p>Have questions about your order or our products? We're here 24/7 to help.</p>
            </div>

            <div className={styles.contactGrid}>
                <div className={styles.contactInfo}>
                    <div className={styles.infoCard}>
                        <h3>Email Us</h3>
                        <p>order@officialfusionshroombar.com</p>
                    </div>
                    <div className={styles.infoCard}>
                        <h3>Visit Us</h3>
                        <p>23563 Baxter Rd, Wildomar, CA, 92595</p>
                    </div>
                    <div className={styles.infoCard}>
                        <h3>Support Hours</h3>
                        <p>Monday - Sunday: 24/7 Online Support</p>
                    </div>
                </div>

                <div className={styles.formSection}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                                <label>Your Name</label>
                                <input type="text" name="name" placeholder="John Doe" required />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Email Address</label>
                                <input type="email" name="email" placeholder="john@example.com" required />
                            </div>
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Subject</label>
                            <input type="text" name="subject" placeholder="Question about order" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Message</label>
                            <textarea name="message" placeholder="How can we help you?" rows={6} required></textarea>
                        </div>
                        <button type="submit" className="premium-gradient">SEND MESSAGE</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
