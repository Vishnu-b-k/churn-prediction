'use client';
import { useState } from 'react';
import { Brain, Zap } from 'lucide-react';
import type { PredictionInput } from '@/lib/api';

const CONTRACT_OPTIONS = ['Month-to-Month', 'One Year', 'Two Year'];
const INTERNET_OPTIONS = ['Fiber Optic', 'DSL', 'No Internet'];
const PAYMENT_OPTIONS = ['Electronic Check', 'Mailed Check', 'Credit Card', 'Bank Transfer'];
const BINARY = ['Yes', 'No'];

interface Props {
    onSubmit: (data: PredictionInput) => Promise<void>;
    loading: boolean;
}

export default function PredictionForm({ onSubmit, loading }: Props) {
    const [form, setForm] = useState<PredictionInput>({
        tenure: 12,
        monthly_charges: 65,
        total_charges: 780,
        num_services: 3,
        contract: 'Month-to-Month',
        internet_service: 'Fiber Optic',
        payment: 'Electronic Check',
        tech_support: 'No',
        online_security: 'No',
        phone_service: 'Yes',
    });

    const set = <K extends keyof PredictionInput>(k: K, v: PredictionInput[K]) => {
        setForm((f) => {
            const updated = { ...f, [k]: v };
            // Auto-compute total charges
            if (k === 'tenure' || k === 'monthly_charges') {
                updated.total_charges = Math.round(Number(updated.tenure) * Number(updated.monthly_charges));
            }
            return updated;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <div className="card">
            <div className="card-title">
                <Brain size={18} style={{ color: 'var(--accent)' }} />
                Customer Profile
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    {/* Tenure */}
                    <div className="form-group">
                        <label className="form-label">Tenure (months)</label>
                        <input type="number" className="form-input" min={1} max={72}
                            value={form.tenure} onChange={e => set('tenure', Number(e.target.value))} />
                    </div>

                    {/* Num Services */}
                    <div className="form-group">
                        <label className="form-label">No. of Services: <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{form.num_services}</span></label>
                        <input type="range" className="form-range" min={1} max={6} step={1}
                            value={form.num_services} onChange={e => set('num_services', Number(e.target.value))} />
                    </div>

                    {/* Monthly */}
                    <div className="form-group">
                        <label className="form-label">Monthly Charges (₹)</label>
                        <input type="number" className="form-input" min={18} max={120} step={0.01}
                            value={form.monthly_charges} onChange={e => set('monthly_charges', Number(e.target.value))} />
                    </div>

                    {/* Total (auto calc) */}
                    <div className="form-group">
                        <label className="form-label">Total Charges (₹)</label>
                        <input type="number" className="form-input"
                            value={form.total_charges} onChange={e => set('total_charges', Number(e.target.value))} />
                    </div>

                    {/* Contract */}
                    <div className="form-group">
                        <label className="form-label">Contract Type</label>
                        <select className="form-select" value={form.contract} onChange={e => set('contract', e.target.value)}>
                            {CONTRACT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                        </select>
                    </div>

                    {/* Internet */}
                    <div className="form-group">
                        <label className="form-label">Internet Service</label>
                        <select className="form-select" value={form.internet_service} onChange={e => set('internet_service', e.target.value)}>
                            {INTERNET_OPTIONS.map(o => <option key={o}>{o}</option>)}
                        </select>
                    </div>

                    {/* Payment */}
                    <div className="form-group full">
                        <label className="form-label">Payment Method</label>
                        <select className="form-select" value={form.payment} onChange={e => set('payment', e.target.value)}>
                            {PAYMENT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                        </select>
                    </div>

                    {/* Tech Support */}
                    <div className="form-group">
                        <label className="form-label">Tech Support</label>
                        <div style={{ display: 'flex', gap: 8 }}>
                            {BINARY.map(opt => (
                                <button key={opt} type="button"
                                    onClick={() => set('tech_support', opt)}
                                    style={{
                                        flex: 1, padding: '8px', borderRadius: 'var(--radius-sm)',
                                        border: `2px solid ${form.tech_support === opt ? 'var(--accent)' : 'var(--border)'}`,
                                        background: form.tech_support === opt ? 'rgba(14,165,233,0.1)' : 'var(--bg-input)',
                                        color: form.tech_support === opt ? 'var(--accent)' : 'var(--text-muted)',
                                        fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', transition: 'var(--transition)',
                                    }}>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Online Security */}
                    <div className="form-group">
                        <label className="form-label">Online Security</label>
                        <div style={{ display: 'flex', gap: 8 }}>
                            {BINARY.map(opt => (
                                <button key={opt} type="button"
                                    onClick={() => set('online_security', opt)}
                                    style={{
                                        flex: 1, padding: '8px', borderRadius: 'var(--radius-sm)',
                                        border: `2px solid ${form.online_security === opt ? 'var(--accent)' : 'var(--border)'}`,
                                        background: form.online_security === opt ? 'rgba(14,165,233,0.1)' : 'var(--bg-input)',
                                        color: form.online_security === opt ? 'var(--accent)' : 'var(--text-muted)',
                                        fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', transition: 'var(--transition)',
                                    }}>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Phone Service */}
                    <div className="form-group full">
                        <label className="form-label">Phone Service</label>
                        <div style={{ display: 'flex', gap: 8 }}>
                            {BINARY.map(opt => (
                                <button key={opt} type="button"
                                    onClick={() => set('phone_service', opt)}
                                    style={{
                                        flex: 1, padding: '8px', borderRadius: 'var(--radius-sm)',
                                        border: `2px solid ${form.phone_service === opt ? 'var(--accent)' : 'var(--border)'}`,
                                        background: form.phone_service === opt ? 'rgba(14,165,233,0.1)' : 'var(--bg-input)',
                                        color: form.phone_service === opt ? 'var(--accent)' : 'var(--text-muted)',
                                        fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', transition: 'var(--transition)',
                                    }}>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button className="btn-predict" type="submit" disabled={loading}>
                    {loading ? <div className="spinner" style={{ width: 20, height: 20 }} /> : <Zap size={18} />}
                    {loading ? 'Predicting…' : 'Predict Churn Risk'}
                </button>
            </form>
        </div>
    );
}
