'use client';

import { useState } from 'react';
import styles from './product.module.css';

interface ProductTabsProps {
    description: string;
    ingredients: string[] | null;
    effects: string[] | null;
}

export default function ProductTabs({ description, ingredients, effects }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'effects'>('description');

    const tabs = [
        { id: 'description', label: 'Description', show: true },
        { id: 'ingredients', label: 'Ingredients', show: !!ingredients },
        { id: 'effects', label: 'Effects', show: !!effects },
    ].filter(t => t.show);

    return (
        <div className={styles.detailsTabs}>
            <div className={styles.tabHeaders} role="tablist" aria-label="Product Information">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        aria-controls={`panel-${tab.id}`}
                        id={`tab-${tab.id}`}
                        className={`${activeTab === tab.id ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab(tab.id as any)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            
            <div className={styles.tabContent}>
                {activeTab === 'description' && (
                    <div 
                        className="animate-fade-in" 
                        role="tabpanel" 
                        id="panel-description" 
                        aria-labelledby="tab-description"
                    >
                        <h3>Product Overview</h3>
                        <p>{description}</p>
                    </div>
                )}

                {activeTab === 'ingredients' && ingredients && (
                    <div 
                        className="animate-fade-in" 
                        role="tabpanel" 
                        id="panel-ingredients" 
                        aria-labelledby="tab-ingredients"
                    >
                        <h3>Ingredients</h3>
                        <ul>
                            {ingredients.map((ing) => <li key={ing}>{ing}</li>)}
                        </ul>
                    </div>
                )}

                {activeTab === 'effects' && effects && (
                    <div 
                        className="animate-fade-in" 
                        role="tabpanel" 
                        id="panel-effects" 
                        aria-labelledby="tab-effects"
                    >
                        <h3>Potential Effects</h3>
                        <ul>
                            {effects.map((effect) => <li key={effect}>{effect}</li>)}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
