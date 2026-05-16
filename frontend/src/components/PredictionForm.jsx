import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send } from "lucide-react";

const defaultForm = {
  tv_advertising_spend: 50000,
  social_media_spend: 40000,
  influencer_marketing_spend: 25000,
  target_audience_size: 150000,
  platform_type: "E-commerce",
  region: "North America",
};

/** Interactive form to submit marketing inputs for AI prediction */
export default function PredictionForm({
  platforms = [],
  regions = [],
  onPredict,
  loading,
}) {
  const [form, setForm] = useState(defaultForm);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict(form);
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-2.5 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20";

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="glass-card p-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="mb-6 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-violet-400" />
        <h2 className="text-lg font-semibold text-white">Sales Prediction</h2>
      </div>
      <p className="mb-4 text-sm text-slate-400">
        Enter your marketing spend and audience details. Our Random Forest model
        will forecast sales revenue.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs text-slate-400">TV Advertising ($)</span>
          <input
            type="number"
            name="tv_advertising_spend"
            value={form.tv_advertising_spend}
            onChange={handleChange}
            min={0}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-slate-400">Social Media ($)</span>
          <input
            type="number"
            name="social_media_spend"
            value={form.social_media_spend}
            onChange={handleChange}
            min={0}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-slate-400">Influencer Marketing ($)</span>
          <input
            type="number"
            name="influencer_marketing_spend"
            value={form.influencer_marketing_spend}
            onChange={handleChange}
            min={0}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-slate-400">Target Audience Size</span>
          <input
            type="number"
            name="target_audience_size"
            value={form.target_audience_size}
            onChange={handleChange}
            min={1000}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-slate-400">Platform Type</span>
          <select
            name="platform_type"
            value={form.platform_type}
            onChange={handleChange}
            className={inputClass}
          >
            {(platforms.length ? platforms : ["E-commerce", "Retail"]).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-slate-400">Region</span>
          <select
            name="region"
            value={form.region}
            onChange={handleChange}
            className={inputClass}
          >
            {(regions.length ? regions : ["North America", "Europe"]).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-glow transition disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
        {loading ? "Predicting..." : "Predict Sales Revenue"}
      </motion.button>
    </motion.form>
  );
}
