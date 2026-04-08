'use client';
import { Lightbulb, AlertTriangle, Info, CheckCircle, ArrowRight } from 'lucide-react';
import type { RetentionInsight } from '@/lib/api';

const icons: Record<string, React.ReactNode> = {
    warning: <AlertTriangle size={15} />,
    danger: <AlertTriangle size={15} />,
    info: <Info size={15} />,
    success: <CheckCircle size={15} />,
};

const colors: Record<string, string> = {
    warning: 'var(--accent-amber)',
    danger: 'var(--accent-red)',
    info: 'var(--accent)',
    success: 'var(--accent-green)',
};

export default function RetentionInsights({ data }: { data: RetentionInsight[] }) {
    if (!data.length) return null;
    return (
        <div className="card">
            <div className="card-title">
                <Lightbulb size={16} style={{ color: 'var(--accent-amber)' }} />
                Retention Strategy
                <span style={{
                    marginLeft: 'auto', fontSize: '0.7rem', fontWeight: 600, padding: '2px 8px',
                    background: 'rgba(14,165,233,0.1)', color: 'var(--accent)',
                    borderRadius: 20, border: '1px solid rgba(14,165,233,0.2)'
                }}>
                    {data.length} actions
                </span>
            </div>
            {data.map((item, i) => (
                <div key={i} className={`insight-card ${item.type}`}>
                    <div className="insight-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                            <span style={{ color: colors[item.type] }}>{icons[item.type]}</span>
                            <span className="insight-title">{item.title}</span>
                        </div>
                        <span className={`impact-badge ${item.impact}`}>{item.impact}</span>
                    </div>
                    <p className="insight-desc">{item.description}</p>
                    <div className="insight-action">
                        <ArrowRight size={12} />
                        {item.action}
                    </div>
                </div>
            ))}
        </div>
    );
}
