/**
 * API client — talks to Flask backend via Vite proxy (/api -> port 8800).
 * Includes fallback data so the UI never shows blank charts on errors.
 */

const API_BASE = "https://salesforecastai.onrender.com/api";

async function fetchJson(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed: ${res.status}`);
  }
  return data;
}

export const api = {
  health: () => fetchJson("/health"),
  dataset: (limit = 20) => fetchJson(`/dataset?limit=${limit}`),
  train: () => fetchJson("/train", { method: "POST" }),
  predict: (payload) =>
    fetchJson("/predict", { method: "POST", body: JSON.stringify(payload) }),
  charts: () => fetchJson("/charts"),
  insights: () => fetchJson("/insights"),
};

/** Fallback chart data when API is unreachable */
export const fallbackCharts = {
  sales_trend: [
    { month: "M1", revenue: 42000 },
    { month: "M2", revenue: 48000 },
    { month: "M3", revenue: 51000 },
    { month: "M4", revenue: 55000 },
    { month: "M5", revenue: 58000 },
    { month: "M6", revenue: 62000 },
  ],
  advertising_spend: [
    { channel: "TV Ads", spend: 75000 },
    { channel: "Social Media", spend: 62000 },
    { channel: "Influencer", spend: 45000 },
  ],
  platform_performance: [
    { name: "E-commerce", value: 120000 },
    { name: "Mobile App", value: 95000 },
    { name: "Retail", value: 80000 },
  ],
  revenue_growth: [
    { period: "P1", revenue: 45000 },
    { period: "P2", revenue: 52000 },
    { period: "P3", revenue: 58000 },
    { period: "P4", revenue: 64000 },
  ],
  feature_importance: [
    { name: "Influencer Marketing", value: 0.28 },
    { name: "TV Advertising", value: 0.25 },
    { name: "Social Media", value: 0.22 },
    { name: "Audience Size", value: 0.15 },
  ],
  regional_sales: [
    { region: "North America", sales: 72000 },
    { region: "Europe", sales: 68000 },
    { region: "Asia Pacific", sales: 81000 },
  ],
};

export const fallbackInsights = {
  insights: ["Connect to the backend to load live insights."],
  recommendations: ["Start the Flask server on port 8800."],
  advertising_effectiveness: [],
  model_metrics: { accuracy_percent: 0 },
};
