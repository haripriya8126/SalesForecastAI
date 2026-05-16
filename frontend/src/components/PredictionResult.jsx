import { motion } from "framer-motion";
import { TrendingUp, Shield, DollarSign, Percent } from "lucide-react";

/** Displays AI prediction output with confidence and ROI */
export default function PredictionResult({ result, loading }) {
  if (loading) {
    return (
      <motion.div className="glass-card flex min-h-[280px] items-center justify-center p-6">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </motion.div>
    );
  }

  if (!result) {
    return (
      <motion.div
        className="glass-card flex min-h-[280px] flex-col items-center justify-center p-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <TrendingUp className="mb-3 h-12 w-12 text-slate-600" />
        <p className="text-slate-400">
          Submit the form to see your AI-powered sales forecast.
        </p>
      </motion.div>
    );
  }

  const items = [
    {
      icon: DollarSign,
      label: "Predicted Revenue",
      value: `$${Number(result.predicted_sales_revenue).toLocaleString()}`,
      color: "text-cyan-400",
    },
    {
      icon: Shield,
      label: "Confidence Score",
      value: `${result.confidence_score}%`,
      color: "text-violet-400",
    },
    {
      icon: Percent,
      label: "Estimated ROI",
      value: `${result.estimated_roi_percent}%`,
      color: "text-emerald-400",
    },
    {
      icon: TrendingUp,
      label: "Total Marketing Spend",
      value: `$${Number(result.total_marketing_spend).toLocaleString()}`,
      color: "text-amber-400",
    },
  ];

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <h2 className="mb-4 text-lg font-semibold gradient-text">AI Prediction Result</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            className="rounded-xl border border-white/5 bg-slate-800/50 p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <item.icon className={`mb-2 h-5 w-5 ${item.color}`} />
            <p className="text-xs text-slate-400">{item.label}</p>
            <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500">
        Powered by Random Forest Regressor trained on synthetic sales data.
      </p>
    </motion.div>
  );
}
