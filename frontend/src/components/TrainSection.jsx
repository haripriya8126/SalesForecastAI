import { motion } from "framer-motion";
import { Brain, RefreshCw } from "lucide-react";

/** Model training controls and accuracy display */
export default function TrainSection({ metrics, onTrain, training }) {
  const accuracy = metrics?.accuracy_percent ?? "—";
  const r2 = metrics?.r2_score ?? "—";
  const mae = metrics?.mae ?? "—";

  return (
    <motion.section
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-violet-400" />
          <h2 className="text-lg font-semibold text-white">Model Training</h2>
        </div>
        <motion.button
          onClick={onTrain}
          disabled={training}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 rounded-xl border border-violet-500/40 bg-violet-500/20 px-4 py-2 text-sm font-medium text-violet-200 transition hover:bg-violet-500/30 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${training ? "animate-spin" : ""}`} />
          {training ? "Training..." : "Retrain Model"}
        </motion.button>
      </div>

      <p className="mt-2 text-sm text-slate-400">
        Random Forest Regressor learns patterns from TV, social, influencer spend,
        audience size, platform, and region.
      </p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-transparent p-4 text-center">
          <p className="text-xs text-slate-400">Accuracy (R²)</p>
          <p className="text-2xl font-bold text-cyan-400">{accuracy}%</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-violet-500/10 to-transparent p-4 text-center">
          <p className="text-xs text-slate-400">R² Score</p>
          <p className="text-2xl font-bold text-violet-400">{r2}</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent p-4 text-center">
          <p className="text-xs text-slate-400">MAE</p>
          <p className="text-2xl font-bold text-emerald-400">${mae}</p>
        </div>
      </div>
    </motion.section>
  );
}
