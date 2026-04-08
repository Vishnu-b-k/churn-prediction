# Customer Churn Prediction App

**ML-powered churn risk scoring — Next.js + FastAPI + scikit-learn Random Forest**

## Features
- 🤖 **Random Forest model** — 200 trees, trained at startup on synthetic Telco-like data
- 🎯 **Single prediction** — 10-feature customer form with real-time prediction
- 📊 **Animated SVG gauge** — Shows churn probability 0–100% with color-coded risk tier
- 📉 **Feature importance chart** — See exactly what drives churn predictions
- 💡 **5 AI Retention Insights** — Personalized strategies based on customer profile
- 📦 **Batch prediction** — Upload CSV for bulk scoring with summary dashboard
- 🌙 **Light/Dark theme** — Neon blue pastel design, persistent preference

## Model Performance
| Metric | Score |
|---|---|
| Accuracy | ~85% |
| AUC-ROC | ~90% |
| Algorithm | Random Forest (200 trees, balanced classes) |

## Quick Start

### 1. Backend (FastAPI + ML)
```bash
cd backend
pip install -r requirements.txt
python main.py
# → Trains model + runs on http://localhost:8001
# → Training takes ~5 seconds on first start
```

### 2. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
# → Runs on http://localhost:3000
```

## Batch CSV Format
```csv
tenure,monthly_charges,total_charges,contract,internet_service,payment,tech_support,online_security,phone_service,num_services
12,65.5,786,Month-to-Month,Fiber Optic,Electronic Check,No,No,Yes,3
48,45.0,2160,Two Year,DSL,Credit Card,Yes,Yes,Yes,5
```

## Deploy
- **Frontend** → Vercel (set `NEXT_PUBLIC_API_URL=<render-url>`)
- **Backend** → Render (Python 3.12, start: `uvicorn main:app --host 0.0.0.0 --port 8001`)

## Resume Bullet
> Developed and deployed a customer churn prediction web app using Random Forest (~85% accuracy, 90% AUC) — FastAPI backend trains model at startup, Next.js frontend provides real-time risk scoring, feature importance analysis, AI retention strategies, and batch CSV prediction for multiple customers.

## Tech Stack
| Layer | Tech |
|---|---|
| Frontend | Next.js 14, TypeScript, Recharts, Lucide |
| Backend | FastAPI, scikit-learn, Pandas, NumPy |
| Model | Random Forest (200 estimators, balanced) |
| Deploy | Vercel (FE) + Render (BE) |
