'use client';
import type { PredictionResult } from '@/lib/api';
import { AlertTriangle, CheckCircle } from 'lucide-react';

function GaugeSVG({ probability }: { probability: number }) {
    const radius = 80;
    const circumference = Math.PI * radius; // semicircle
    const filled = (probability / 100) * circumference;

    // Color interpolation
    const r = probability < 50 ? Math.round((probability / 50) * 251) : 251;
    const g = probability < 50 ? 191 : Math.round(((100 - probability) / 50) * 191);
    const trackColor = `rgb(${r},${g},36)`;

    const angle = (probability / 100) * 180 - 90; // degrees from -90 to 90
    const rad = (angle * Math.PI) / 180;
    const px = 100 + radius * Math.cos(rad);
    const py = 100 + radius * Math.sin(rad);

    return (
        <svg viewBox="0 0 200 110" width="200" height="110" style={{ overflow: 'visible' }}>
            {/* Track */}
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--border)" strokeWidth="14" strokeLinecap="round" />
            {/* Fill */}
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke={trackColor}
                strokeWidth="14" strokeLinecap="round"
                strokeDasharray={`${filled} ${circumference}`}
                style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)' }} />
            {/* Needle dot */}
            <circle cx={px} cy={py} r="7" fill={trackColor} style={{ filter: `drop-shadow(0 0 6px ${trackColor})` }} />
            {/* Labels */}
            <text x="18" y="120" fontSize="9" fill="var(--text-muted)" textAnchor="middle">0%</text>
            <text x="100" y="18" fontSize="9" fill="var(--text-muted)" textAnchor="middle">50%</text>
            <text x="182" y="120" fontSize="9" fill="var(--text-muted)" textAnchor="middle">100%</text>
        </svg>
    );
}

export default function PredictionResult({ result }: { result: PredictionResult }) {
    const isChurn = result.prediction === 1;

    return (
        <div className="card">
            <div className="card-title">
                {isChurn
                    ? <AlertTriangle size={18} style={{ color: 'var(--accent-red)' }} />
                    : <CheckCircle size={18} style={{ color: 'var(--accent-green)' }} />
                }
                Prediction Result
            </div>

            {/* Gauge */}
            <div className="gauge-container">
                <GaugeSVG probability={result.churn_probability} />
                <div className="risk-label">
                    <div className="risk-tier" style={{ color: result.risk_color }}>
                        {result.risk_tier}
                    </div>
                    <div className="risk-prob">{result.churn_probability}% churn probability</div>
                </div>
            </div>

            {/* Prediction banner */}
            <div style={{
                margin: '16px 0',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                background: isChurn ? 'rgba(248,113,113,0.1)' : 'rgba(52,211,153,0.1)',
                border: `1px solid ${isChurn ? 'rgba(248,113,113,0.3)' : 'rgba(52,211,153,0.3)'}`,
                display: 'flex', alignItems: 'center', gap: 10,
                fontSize: '0.9rem', fontWeight: 700,
                color: isChurn ? 'var(--accent-red)' : 'var(--accent-green)',
            }}>
                {isChurn ? <AlertTriangle size={16} /> : <CheckCircle size={16} />}
                {isChurn ? 'Likely to churn — immediate action recommended' : 'Low churn risk — continue nurturing'}
            </div>

            {/* Risk Factors */}
            {result.risk_factors.length > 0 && (
                <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
                        Top Risk Factors
                    </div>
                    {result.risk_factors.map((f, i) => (
                        <div key={i} className="risk-factor">
                            <AlertTriangle size={13} style={{ color: 'var(--accent-red)', flexShrink: 0, marginTop: 1 }} />
                            {f}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
