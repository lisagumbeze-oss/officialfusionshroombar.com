'use client';

import { useState, useEffect } from 'react';
import { 
    Save, Globe, Image as ImageIcon, Mail, 
    Smartphone, MapPin, DollarSign, ShieldAlert,
    Code, Facebook, Twitter, Instagram
} from 'lucide-react';
import styles from '../admin.module.css';
import { useToast } from '@/context/ToastContext';

export default function SettingsForm() {
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('general');
    const { showToast } = useToast();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/admin/settings');
                const data = await res.json();
                setSettings(data);
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                body: JSON.stringify(settings),
            });
            if (res.ok) {
                showToast('Settings saved successfully');
            }
        } catch (error) {
            showToast('Failed to save settings', 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading settings...</div>;

    return (
        <div className={styles.card} style={{ overflow: 'hidden' }}>
            <div className={styles.tabContainer} style={{ background: 'rgba(0,0,0,0.2)' }}>
                <button className={activeTab === 'general' ? styles.activeTab : ''} onClick={() => setActiveTab('general')}>General</button>
                <button className={activeTab === 'seo' ? styles.activeTab : ''} onClick={() => setActiveTab('seo')}>SEO & Meta</button>
                <button className={activeTab === 'localization' ? styles.activeTab : ''} onClick={() => setActiveTab('localization')}>Localization</button>
                <button className={activeTab === 'system' ? styles.activeTab : ''} onClick={() => setActiveTab('system')}>System</button>
            </div>

            <form onSubmit={handleSave} style={{ padding: '2rem' }}>
                {activeTab === 'general' && (
                    <div className={styles.formSection}>
                        <div className={styles.inputGroup}>
                            <label>Store Name</label>
                            <input type="text" value={settings.storeName} onChange={(e) => setSettings({...settings, storeName: e.target.value})} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Tagline</label>
                            <input type="text" value={settings.tagline || ''} onChange={(e) => setSettings({...settings, tagline: e.target.value})} placeholder="Premium Shroom Bars" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Store Description</label>
                            <textarea rows={3} value={settings.storeDescription || ''} onChange={(e) => setSettings({...settings, storeDescription: e.target.value})} />
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <div className={styles.inputGroup} style={{ flex: 1 }}>
                                <label><Mail size={14} /> Support Email</label>
                                <input type="email" value={settings.email || ''} onChange={(e) => setSettings({...settings, email: e.target.value})} />
                            </div>
                            <div className={styles.inputGroup} style={{ flex: 1 }}>
                                <label><Smartphone size={14} /> Contact Phone</label>
                                <input type="text" value={settings.phone || ''} onChange={(e) => setSettings({...settings, phone: e.target.value})} />
                            </div>
                        </div>
                        <div className={styles.inputGroup}>
                            <label><MapPin size={14} /> Physical Address</label>
                            <input type="text" value={settings.address || ''} onChange={(e) => setSettings({...settings, address: e.target.value})} />
                        </div>
                    </div>
                )}

                {activeTab === 'seo' && (
                    <div className={styles.formSection}>
                        <div className={styles.inputGroup}>
                            <label><Globe size={14} /> Site Title Template</label>
                            <input type="text" value={settings.siteTitleTemplate} onChange={(e) => setSettings({...settings, siteTitleTemplate: e.target.value})} />
                            <p style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.4rem' }}>Available tags: %page_title%, %site_name%</p>
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Default Meta Description</label>
                            <textarea rows={3} value={settings.defaultMetaDescription || ''} onChange={(e) => setSettings({...settings, defaultMetaDescription: e.target.value})} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label><Code size={14} /> Robots.txt Content</label>
                            <textarea rows={5} value={settings.robotsTxt || ''} onChange={(e) => setSettings({...settings, robotsTxt: e.target.value})} style={{ fontFamily: 'monospace' }} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Google Analytics ID (G-XXXXX)</label>
                            <input type="text" value={settings.googleAnalyticsId || ''} onChange={(e) => setSettings({...settings, googleAnalyticsId: e.target.value})} />
                        </div>
                    </div>
                )}

                {activeTab === 'localization' && (
                    <div className={styles.formSection}>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <div className={styles.inputGroup} style={{ flex: 1 }}>
                                <label><DollarSign size={14} /> Currency Code</label>
                                <input type="text" value={settings.currencyCode} onChange={(e) => setSettings({...settings, currencyCode: e.target.value})} />
                            </div>
                            <div className={styles.inputGroup} style={{ flex: 1 }}>
                                <label>Currency Symbol</label>
                                <input type="text" value={settings.currencySymbol} onChange={(e) => setSettings({...settings, currencySymbol: e.target.value})} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'system' && (
                    <div className={styles.formSection}>
                        <div className={styles.inputGroup}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                                <input type="checkbox" checked={settings.maintenanceMode} onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})} style={{ width: 'auto' }} />
                                <div>
                                    <div style={{ fontWeight: 700, color: '#ef4444' }}>Enable Maintenance Mode</div>
                                    <div style={{ fontSize: '0.75rem', color: '#666' }}>Prevent customers from accessing the site. Admin access remains active.</div>
                                </div>
                            </label>
                        </div>
                        <div className={styles.inputGroup}>
                            <label><ShieldAlert size={14} /> Maintenance Message</label>
                            <textarea rows={3} value={settings.maintenanceMessage || ''} onChange={(e) => setSettings({...settings, maintenanceMessage: e.target.value})} />
                        </div>
                    </div>
                )}

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                    <button type="submit" disabled={saving} className={styles.btnPrimary} style={{ minWidth: '160px', justifyContent: 'center' }}>
                        <Save size={18} />
                        <span>{saving ? 'Saving...' : 'Save Settings'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
