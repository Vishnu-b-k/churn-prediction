'use client';
import type { FeatureImportance } from '@/lib/api';
import { BarChart2 } from 'lucide-react';

const GRADIENT_COLORS = [
    'var(--accent)', 'var(--accent-neon)', 'var(--accent-purple)',
    'var(--accent-green)', 'var(--accent-amber)',
];

export default function FeatureImportanceChart({ data }: { data: FeatureImportance[] }) {
    const max = data[0]?.importance || 1;

    return (
        <div className="card">
            <div className="card-title">
                <BarChart2 size={16} style={{ color: 'var(--accent-purple)' }} />
                Feature Importance
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: 4, fontWeight: 400 }}>
                    (what drives churn)
                </span>
            </div>

            {data.map((item, i) => (
                <div key={item.feature} className="fi-bar-row">
                    <div className="fi-label">{item.feature}</div>
                    <div className="fi-track">
                        <div
                            className="fi-fill"
                            style={{
                                width: `${(item.importance / max) * 100}%`,
                                background: `linear-gradient(90deg, ${GRADIENT_COLORS[i % GRADIENT_COLORS.length]}, var(--accent-neon))`,
                            }}
                        />
                    </div>
                    <div className="fi-pct">{item.importance.toFixed(1)}%</div>
                </div>
            ))}
        </div>
    );
}
