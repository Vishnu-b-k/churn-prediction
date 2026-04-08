# Customer Churn Prediction App

**ML-powered churn risk scoring — Next.js + FastAPI + scikit-learn Random Forest**

## 🛡️ RiskGuard — AI-Powered Customer Churn Prediction

![Project Banner](https://raw.githubusercontent.com/Vishnu-b-k/churn-prediction/main/assets/hero.png)

**RiskGuard** is a production-grade machine learning application designed to identify at-risk customers before they churn. Built with **scikit-learn** and **FastAPI**, it provides real-time risk scoring, feature importance analysis, and AI-driven retention strategies.

---

## 🌟 Key Features

### 🧠 Random Forest Intelligence
Features a robust **Random Forest Classifier** (200 trees) trained on customer behavior patterns. The model provides both a binary churn prediction and a granular probability score (Risk Gauge).

### ⚡ Feature Importance Visualization
Uses **Recharts** to dynamically visualize which factors (e.g., Monthly Charges, Tenure, Contract Type) are most heavily influencing a specific customer's churn risk.

### 🇮🇳 Indian Market Localization
Localized financial metrics for the Indian market, using **Rupee (₹) symbols** for monthly charges and total billings.

### 💡 Personalized Retention Insights
The system generates 5 contextual retention strategies based on the customer's profile:
- **Contract Incentives**: Detecting long-term potential.
- **Support Optimization**: Highlighting technical friction points.
- **Pricing Adjustments**: Identifying price-sensitive segments.
- **Service Bundling**: Suggestions based on existing usage.
- **Loyalty Program Enrollment**: Triggered by high-value/long-tenure segments.

---

## 🛠️ Technical Stack

- **Backend** (Render): 
    - Create a **Web Service**.
    - Set **Root Directory** to `backend`.
    - Build Command: `pip install -r requirements.txt`
    - Start Command: `uvicorn main:app --host 0.0.0.0 --port 10000`
- **Frontend** (Vercel): 
    - Set **Root Directory** to `frontend`.
    - Set Environment Variable `NEXT_PUBLIC_API_URL` to your Render URL.

---

## 🚀 Quick Start

### 1. Backend Setup (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python main.py
```
*Backend runs on `http://127.0.0.1:8001`.*

### 2. Frontend Setup (Next.js)
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
