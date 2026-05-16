import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  BarChart2,
  DollarSign,
  LineChart,
  Wifi,
  WifiOff,
} from "lucide-react";

import { api, fallbackCharts, fallbackInsights } from "./api/client";
import ChartsSection from "./components/ChartsSection";
import DatasetTable from "./components/DatasetTable";
import InsightsPanel from "./components/InsightsPanel";
import LoadingSpinner from "./components/LoadingSpinner";
import PredictionForm from "./components/PredictionForm";
import PredictionResult from "./components/PredictionResult";
import StatCard from "./components/StatCard";
import TrainSection from "./components/TrainSection";

/**
 * SalesVisionAI — main dashboard.
 * Loads data from Flask API on mount; shows loading and error states.
 */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  const [dataset, setDataset] = useState(null);
  const [charts, setCharts] = useState(fallbackCharts);
  const [insights, setInsights] = useState(fallbackInsights);
  const [metrics, setMetrics] = useState(null);

  const [predicting, setPredicting] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [training, setTraining] = useState(false);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const health = await api.health();
      setConnected(health.status === "ok");

      const [ds, ch, ins] = await Promise.all([
        api.dataset(15),
        api.charts(),
        api.insights(),
      ]);

      setDataset(ds);
      setCharts(ch);
      setInsights(ins);
      setMetrics(ins.model_metrics || null);
    } catch (err) {
      setConnected(false);
      setError(err.message || "Failed to connect to backend");
      setCharts(fallbackCharts);
      setInsights(fallbackInsights);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handlePredict = async (formData) => {
    setPredicting(true);
    setPrediction(null);
    try {
      const res = await api.predict(formData);
      setPrediction(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setPredicting(false);
    }
  };

  const handleTrain = async () => {
    setTraining(true);
    try {
      const res = await api.train();
      if (res.metrics) setMetrics(res.metrics);
      const [ch, ins] = await Promise.all([api.charts(), api.insights()]);
      setCharts(ch);
      setInsights(ins);
    } catch (err) {
      setError(err.message);
    } finally {
      setTraining(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner label="Loading SalesVisionAI dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-900/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-2xl font-bold sm:text-3xl">
              <span className="gradient-text">SalesVisionAI</span>
            </h1>
            <p className="text-sm text-slate-400">
              AI-powered sales prediction dashboard
            </p>
          </motion.div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-800/60 px-4 py-2 text-sm">
            {connected ? (
              <>
                <Wifi className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-300">API Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 text-amber-400" />
                <span className="text-amber-300">Offline — using fallback data</span>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
        {error && (
          <motion.div
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* KPI cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={DollarSign}
            label="Avg Sales Revenue"
            value={`$${Number(dataset?.summary?.avg_sales_revenue || 0).toLocaleString()}`}
            subtext="From training dataset"
            delay={0}
          />
          <StatCard
            icon={Activity}
            label="Model Accuracy"
            value={`${metrics?.accuracy_percent ?? "—"}%`}
            subtext="Random Forest R² score"
            delay={0.1}
          />
          <StatCard
            icon={BarChart2}
            label="Dataset Rows"
            value={dataset?.total_rows ?? 500}
            subtext="Synthetic sales records"
            delay={0.2}
          />
          <StatCard
            icon={LineChart}
            label="Top Platform"
            value={insights?.top_platform ?? "—"}
            subtext="Highest avg revenue"
            delay={0.3}
          />
        </div>

        {/* Prediction + result */}
        <div className="grid gap-6 lg:grid-cols-2">
          <PredictionForm
            platforms={dataset?.platforms}
            regions={dataset?.regions}
            onPredict={handlePredict}
            loading={predicting}
          />
          <PredictionResult result={prediction} loading={predicting} />
        </div>

        <TrainSection metrics={metrics} onTrain={handleTrain} training={training} />

        <ChartsSection chartData={charts} />

        <InsightsPanel insights={insights} />

        {dataset && (
          <DatasetTable data={dataset} summary={dataset.summary} />
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 border-t border-white/5 bg-slate-900/80 py-2 text-center text-xs text-slate-500 backdrop-blur">
        SalesVisionAI · React + Flask · Random Forest ML
      </footer>
    </div>
  );
}
