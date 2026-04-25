'use client';

import { useState } from 'react';
import { X, Brain, Zap, Moon, Sparkles, ChevronRight, Info } from 'lucide-react';
import styles from './dosage.module.css';

export default function DosageCalculator() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState({
        experience: '',
        goal: '',
        intensity: ''
    });

    const reset = () => {
        setStep(1);
        setSelections({ experience: '', goal: '', intensity: '' });
    };

    const getRecommendation = () => {
        if (selections.goal === 'Focus') return { product: 'Matcha Zen Bar', dose: '1-2 Squares', desc: 'Perfect for cognitive flow and jitter-free energy.' };
        if (selections.goal === 'Sleep') return { product: 'Lavender Night Bar', dose: '2-3 Squares', desc: 'Promotes deep relaxation and restorative sleep.' };
        if (selections.intensity === 'High') return { product: 'Fusion Elite 5g', dose: '1 Square', desc: 'Maximum potency for experienced users seeking deep insight.' };
        return { product: 'Original Fusion Bar', dose: '1-2 Squares', desc: 'The gold standard for balanced microdosing.' };
    };

    if (!isOpen) {
        return (
            <button 
                className={styles.triggerBtn} 
                onClick={() => setIsOpen(true)}
                aria-label="Open Dosage Calculator"
            >
                <Brain size={18} /> DOSAGE GUIDE
            </button>
        );
    }

    const recommendation = getRecommendation();

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={() => setIsOpen(false)}><X /></button>
                
                <div className={styles.progress}>
                    <div className={styles.progressBar} style={{ width: `${(step / 4) * 100}%` }}></div>
                </div>

                {step === 1 && (
                    <div className={styles.stepContent}>
                        <Sparkles className={styles.stepIcon} />
                        <h2>What's your experience level?</h2>
                        <div className={styles.options}>
                            {['Beginner', 'Intermediate', 'Pro'].map(opt => (
                                <button key={opt} onClick={() => { setSelections({...selections, experience: opt}); setStep(2); }}>
                                    {opt} <ChevronRight size={16} />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className={styles.stepContent}>
                        <Zap className={styles.stepIcon} />
                        <h2>What's your primary goal?</h2>
                        <div className={styles.options}>
                            {[
                                { id: 'Focus', icon: <Brain size={16} /> },
                                { id: 'Energy', icon: <Zap size={16} /> },
                                { id: 'Sleep', icon: <Moon size={16} /> }
                            ].map(opt => (
                                <button key={opt.id} onClick={() => { setSelections({...selections, goal: opt.id}); setStep(3); }}>
                                    <span className={styles.optIcon}>{opt.icon}</span> {opt.id} <ChevronRight size={16} />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className={styles.stepContent}>
                        <Sparkles className={styles.stepIcon} />
                        <h2>Desired Intensity?</h2>
                        <div className={styles.options}>
                            {['Subtle', 'Noticeable', 'High'].map(opt => (
                                <button key={opt} onClick={() => { setSelections({...selections, intensity: opt}); setStep(4); }}>
                                    {opt} <ChevronRight size={16} />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className={styles.resultContent}>
                        <div className={styles.resultBadge}>YOUR ELITE MATCH</div>
                        <h3>{recommendation.product}</h3>
                        <div className={styles.doseTag}>RECOMMENDED DOSE: {recommendation.dose}</div>
                        <p>{recommendation.desc}</p>
                        
                        <div className={styles.disclaimer}>
                            <Info size={14} />
                            <span>Always start low and go slow. Effects vary by individual.</span>
                        </div>

                        <div className={styles.resultActions}>
                            <button className="premium-gradient" onClick={() => setIsOpen(false)}>VIEW PRODUCT</button>
                            <button className={styles.resetBtn} onClick={reset}>RETAKE QUIZ</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
