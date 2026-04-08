'use client';
import { useState, useEffect } from 'react';
import { Brain, BarChart2, RefreshCw, Upload, X, Activity } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import PredictionForm from '@/components/PredictionForm';
import PredictionResultCard from '@/components/PredictionResult';
import FeatureImportanceChart from '@/components/FeatureImportanceChart';
import RetentionInsights from '@/components/RetentionInsights';
import {
  api, API_URL,
  type PredictionInput, type PredictionResult,
  type FeatureImportance, type RetentionInsight, type ModelStats,
} from '@/lib/api';

const DEFAULT_INPUT: PredictionInput = {
  tenure: 12, monthly_charges: 65, total_charges: 780, num_services: 3,
  contract: 'Month-to-Month', internet_service: 'Fiber Optic',
  payment: 'Electronic Check', tech_support: 'No',
  online_security: 'No', phone_service: 'Yes',
};

export default function ChurnDashboard() {
  const [stats, setStats] = useState<ModelStats | null>(null);
  const [featureImportance, setFeatureImportance] = useState<FeatureImportance[]>([]);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [insights, setInsights] = useState<RetentionInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const [initError, setInitError] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  // Batch state
  const [batchFile, setBatchFile] = useState<File | null>(null);
  const [batchLoading, setBatchLoading] = useState(false);
  const [batchSummary, setBatchSummary] = useState<Record<string, unknown> | null>(null);
  const [batchDrag, setBatchDrag] = useState(false);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    Promise.all([api.getModelStats(), api.getFeatureImportance()])
      .then(([s, fi]) => { setStats(s); setFeatureImportance(fi); })
      .catch(() => setInitError(true));
    // Run default prediction on mount so UI is populated
    handlePredict(DEFAULT_INPUT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePredict = async (data: PredictionInput) => {
    setLoading(true);
    try {
      const [res, ins] = await Promise.all([
        api.predict(data),
        api.getRetentionInsights(data),
      ]);
      setResult(res);
      setInsights(ins);
    } catch {
      showToast('Backend unreachable. Please start the FastAPI server on port 8001.', false);
    } finally {
      setLoading(false);
    }
  };

  const handleBatch = async (file: File) => {
    if (!file.name.endsWith('.csv')) { showToast('Please upload a CSV file', false); return; }
    setBatchFile(file);
    setBatchLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${API_URL}/api/batch-predict`, { method: 'POST', body: formData });
      const data = await res.json();
      if (data.error) { showToast(data.error, false); return; }
      setBatchSummary(data.summary);
      showToast(`Batch complete: ${data.summary.predicted_churners} at-risk customers identified`);
    } catch {
      showToast('Batch prediction failed', false);
    } finally {
      setBatchLoading(false);
    }
  };

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon"><Brain size={18} color="white" /></div>
            <span className="logo-text">Churn<span>Predictor</span></span>
          </div>

          {stats && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent)' }}>{stats.accuracy}%</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Accuracy</div>
              </div>
              <div style={{ width: 1, height: 28, background: 'var(--border)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-purple)' }}>{stats.auc_score}%</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>AUC Score</div>
              </div>
              <div style={{ width: 1, height: 28, background: 'var(--border)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="status-dot" />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{stats.algorithm}</span>
              </div>
            </div>
          )}

          <div className="header-actions">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ── Page Body ───────────────────────────────────────────────────── */}
      <main className="page-wrap">
        {/* Hero */}
        <div className="page-hero">
          <h1 className="page-title">Customer Churn Prediction</h1>
          <p className="page-subtitle">
            ML-powered churn risk scoring with feature importance analysis and AI retention strategies
          </p>
        </div>

        {/* Backend error banner */}
        {initError && (
          <div style={{
            background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)',
            borderRadius: 'var(--radius-sm)', padding: '12px 18px', marginBottom: 20,
            fontSize: '0.875rem', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <Activity size={16} />
            Backend unreachable — run <code style={{ background: 'rgba(0,0,0,0.1)', padding: '1px 6px', borderRadius: 4 }}>uvicorn main:app --port 8001</code> in <code style={{ background: 'rgba(0,0,0,0.1)', padding: '1px 6px', borderRadius: 4 }}>churn-predictor/backend</code>
          </div>
        )}

        {/* Main 2-col grid */}
        <div className="main-grid">
          {/* Left: Form */}
          <PredictionForm onSubmit={handlePredict} loading={loading} />

          {/* Right: Results + Feature Importance + Insights */}
          <div className="right-col">
            {result ? (
              <>
                <PredictionResultCard result={result} />
                <RetentionInsights data={insights} />
              </>
            ) : (
              <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 240, gap: 12, color: 'var(--text-muted)' }}>
                {loading ? (
                  <><div className="spinner" /><span>Analyzing customer profile…</span></>
                ) : (
                  <><Brain size={36} style={{ opacity: 0.3 }} /><span style={{ fontSize: '0.9rem' }}>Fill in the form and click Predict</span></>
                )}
              </div>
            )}

            {/* Feature importance — always shown */}
            {featureImportance.length > 0 && (
              <FeatureImportanceChart data={featureImportance} />
            )}

            {/* Batch prediction */}
            <div className="card">
              <div className="card-title">
                <Upload size={16} style={{ color: 'var(--accent-neon)' }} />
                Batch Prediction
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: 4 }}>
                  Upload CSV with customer data
                </span>
              </div>

              {batchSummary ? (
                <div>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <div className="summary-num">{String(batchSummary.total_customers)}</div>
                      <div className="summary-lbl">Total</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-num" style={{ color: 'var(--accent-red)' }}>{String(batchSummary.predicted_churners)}</div>
                      <div className="summary-lbl">At Risk</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-num" style={{ color: 'var(--accent-amber)' }}>{String(batchSummary.churn_rate)}%</div>
                      <div className="summary-lbl">Churn Rate</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-num" style={{ color: 'var(--accent-red)' }}>{String(batchSummary.critical_risk)}</div>
                      <div className="summary-lbl">Critical</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-num" style={{ color: 'var(--accent-amber)' }}>{String(batchSummary.high_risk)}</div>
                      <div className="summary-lbl">High Risk</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-num">{String(batchSummary.avg_churn_probability)}%</div>
                      <div className="summary-lbl">Avg Prob</div>
                    </div>
                  </div>
                  <button
                    style={{ marginTop: 12, padding: '7px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card-alt)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6 }}
                    onClick={() => { setBatchSummary(null); setBatchFile(null); }}
                  >
                    <X size={13} /> Clear
                  </button>
                </div>
              ) : (
                <div
                  className={`upload-zone ${batchDrag ? 'drag-over' : ''}`}
                  onClick={() => document.getElementById('batch-input')?.click()}
                  onDragOver={(e) => { e.preventDefault(); setBatchDrag(true); }}
                  onDragLeave={() => setBatchDrag(false)}
                  onDrop={(e) => { e.preventDefault(); setBatchDrag(false); const f = e.dataTransfer.files[0]; if (f) handleBatch(f); }}
                >
                  {batchLoading ? (
                    <div className="spinner" style={{ margin: '0 auto' }} />
                  ) : (
                    <>
                      <Upload size={22} style={{ margin: '0 auto 8px', display: 'block', color: 'var(--accent)' }} />
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                        Drop a CSV or click to upload
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Needs: tenure, monthly_charges, contract columns
                      </div>
                    </>
                  )}
                  <input id="batch-input" type="file" accept=".csv" style={{ display: 'none' }}
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleBatch(f); e.target.value = ''; }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <div className="toast" style={{ borderColor: toast.ok ? 'var(--accent-green)' : 'var(--accent-red)' }}>
          <Activity size={16} style={{ color: toast.ok ? 'var(--accent-green)' : 'var(--accent-red)' }} />
          {toast.msg}
        </div>
      )}
    </>
  );
}
