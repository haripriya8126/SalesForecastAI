import { motion } from "framer-motion";
import { Lightbulb, Target, BarChart3 } from "lucide-react";

/** Business insights, recommendations, and ad effectiveness */
export default function InsightsPanel({ insights }) {
  if (!insights) return null;

  const {
    insights: insightList = [],
    recommendations = [],
    advertising_effectiveness = [],
    top_platform,
    top_region,
    best_channel,
  } = insights;

  return (
    <motion.section
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-amber-400" />
        <h2 className="text-lg font-semibold text-white">Business Insights</h2>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {top_platform && (
          <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
            Top Platform: {top_platform}
          </span>
        )}
        {top_region && (
          <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs text-violet-300">
            Top Region: {top_region}
          </span>
        )}
        {best_channel && (
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">
            Best Channel: {best_channel}
          </span>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-2 flex items-center gap-1 text-sm font-medium text-slate-300">
            <BarChart3 className="h-4 w-4" /> Key Insights
          </h3>
          <ul className="space-y-2">
            {insightList.map((text, i) => (
              <motion.li
                key={i}
                className="rounded-lg border border-white/5 bg-slate-800/40 px-3 py-2 text-sm text-slate-300"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {text}
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 flex items-center gap-1 text-sm font-medium text-slate-300">
            <Target className="h-4 w-4" /> Recommendations
          </h3>
          <ul className="space-y-2">
            {recommendations.map((text, i) => (
              <li
                key={i}
                className="rounded-lg border border-violet-500/20 bg-violet-500/10 px-3 py-2 text-sm text-violet-100"
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {advertising_effectiveness.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-medium text-slate-300">
            Advertising Effectiveness
          </h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {advertising_effectiveness.map((ch) => (
              <div
                key={ch.channel}
                className="rounded-xl border border-white/10 bg-slate-800/50 p-4"
              >
                <p className="text-sm font-medium text-white">{ch.channel}</p>
                <p className="mt-1 text-2xl font-bold text-cyan-400">
                  {ch.effectiveness}%
                </p>
                <p className="text-xs text-slate-500">
                  Avg spend: ${Number(ch.avg_spend).toLocaleString()}
                </p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-700">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(ch.effectiveness, 100)}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
}
