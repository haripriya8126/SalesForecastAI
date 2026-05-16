# SalesVisionAI

A modern, full-stack **AI sales prediction dashboard** that forecasts future sales revenue using machine learning. Built with React, Tailwind CSS, and Flask — designed to be portfolio- and internship-ready.

![SalesVisionAI](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Flask](https://img.shields.io/badge/Flask-3-000000?style=flat&logo=flask)
![scikit-learn](https://img.shields.io/badge/scikit--learn-ML-F7931E?style=flat)

---

## Screenshots

> Add screenshots after running the app:
>
> 1. Dashboard overview with KPI cards  
> 2. Prediction form and AI result card  
> 3. Analytics charts grid  
> 4. Business insights panel  

Place images in `/docs/screenshots/` and link them here for your GitHub README.

---

## Features

- **Interactive sales prediction** — Enter TV, social, and influencer spend plus audience, platform, and region
- **Random Forest ML model** — Trained on a realistic synthetic dataset (500+ rows)
- **Model accuracy & confidence** — R²-based accuracy, MAE, and prediction confidence score
- **6 responsive Recharts** — Sales trend, ad spend, platform pie, revenue growth, feature importance, regional comparison
- **Business insights** — Auto-generated insights, marketing recommendations, and ad effectiveness
- **Dark glassmorphism UI** — Neon blue/purple gradients, Framer Motion animations, fully responsive
- **Robust API layer** — Health check, fallback data, loading states, and error handling

---

## Tech Stack

| Layer      | Technologies                                      |
|-----------|---------------------------------------------------|
| Frontend  | React, Vite, Tailwind CSS, Recharts, Framer Motion, Lucide React |
| Backend   | Flask, Flask-CORS, pandas, numpy, scikit-learn    |
| ML        | Random Forest Regressor, Label Encoding           |

---

## Project Structure

```
CodeAlphaSalesAI/
├── backend/
│   ├── app.py              # Flask API (port 8800)
│   ├── data_generator.py   # Synthetic sales dataset
│   └── ml_model.py         # Random Forest training & prediction
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api/client.js
│   │   └── components/
│   └── vite.config.js      # Proxy /api → :8800
├── requirements.txt
└── README.md
```

---

## Setup Instructions

### Prerequisites

- **Python 3.10+**
- **Node.js 18+** and npm

### 1. Backend

```bash
cd CodeAlphaSalesAI
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
python backend/app.py
```

Backend runs at **http://127.0.0.1:8800**

### 2. Frontend

Open a new terminal:

```bash
cd CodeAlphaSalesAI/frontend
npm install
npm run dev
```

Frontend runs at **http://localhost:5173** (proxies `/api` to Flask).

---

## API Endpoints

| Method | Endpoint        | Description                    |
|--------|-----------------|--------------------------------|
| GET    | `/api/health`   | Service health & model status  |
| GET    | `/api/dataset`  | Dataset preview & summary      |
| POST   | `/api/train`    | Retrain Random Forest model    |
| POST   | `/api/predict`  | Predict sales from inputs      |
| GET    | `/api/charts`   | Chart data for Recharts        |
| GET    | `/api/insights` | Business insights & tips       |

---

## Internship-Ready Description

**SalesVisionAI** demonstrates end-to-end full-stack development with a real ML pipeline: synthetic data generation, model training (Random Forest), REST API design, and a polished React dashboard. It shows skills in **data science**, **backend engineering**, **frontend UX**, and **product thinking** — suitable for data science, ML engineering, or full-stack internship portfolios.

**Highlights for recruiters:**

- Clean separation of concerns (data / ML / API / UI)
- Production-style patterns: CORS, proxy, error handling, fallbacks
- Explainable ML via feature importance charts
- Actionable business insights from data correlations

---

## License

MIT — free to use for learning and portfolio projects.
