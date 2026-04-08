const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

async function fetcher<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store', ...init });
    if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
    return res.json() as Promise<T>;
}

export type ModelStats = {
    accuracy: number; auc_score: number;
    training_samples: number; test_samples: number;
    churn_rate: number; algorithm: string;
};

export type FeatureImportance = { feature: string; importance: number };

export type PredictionInput = {
    tenure: number; monthly_charges: number; total_charges: number;
    num_services: number; contract: string; internet_service: string;
    payment: string; tech_support: string; online_security: string; phone_service: string;
};

export type PredictionResult = {
    prediction: number; churn_probability: number;
    risk_tier: string; risk_color: string; risk_factors: string[];
};

export type RetentionInsight = {
    type: string; title: string; description: string; impact: string; action: string;
};

export type BatchSummary = {
    total_customers: number; predicted_churners: number;
    churn_rate: number; avg_churn_probability: number;
    critical_risk: number; high_risk: number;
};

export const API_URL = API_BASE;

export const api = {
    getModelStats: () => fetcher<ModelStats>('/api/model-stats'),
    getFeatureImportance: () => fetcher<FeatureImportance[]>('/api/feature-importance'),
    predict: (data: PredictionInput) => fetcher<PredictionResult>('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }),
    getRetentionInsights: (data: PredictionInput) => fetcher<RetentionInsight[]>('/api/retention-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }),
};
