import { motion } from "framer-motion";
import { Database } from "lucide-react";

const COLUMN_LABELS = {
  tv_advertising_spend: "TV Spend",
  social_media_spend: "Social",
  influencer_marketing_spend: "Influencer",
  target_audience_size: "Audience",
  platform_type: "Platform",
  region: "Region",
  sales_revenue: "Revenue",
};

/** Preview table of the training dataset */
export default function DatasetTable({ data, summary }) {
  const columns = data?.columns || [];
  const preview = data?.preview || [];

  return (
    <motion.section
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-cyan-400" />
          <h2 className="text-lg font-semibold text-white">Dataset Preview</h2>
        </div>
        <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
          {data?.total_rows ?? 0} rows
        </span>
      </div>

      {summary && (
        <div className="mb-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
          <div className="rounded-lg bg-slate-800/60 p-2">
            <span className="text-slate-500">Avg Revenue</span>
            <p className="font-semibold text-white">
              ${Number(summary.avg_sales_revenue).toLocaleString()}
            </p>
          </div>
          <motion.div className="rounded-lg bg-slate-800/60 p-2">
            <span className="text-slate-500">Avg TV</span>
            <p className="font-semibold text-white">
              ${Number(summary.avg_tv_spend).toLocaleString()}
            </p>
          </motion.div>
          <div className="rounded-lg bg-slate-800/60 p-2">
            <span className="text-slate-500">Avg Social</span>
            <p className="font-semibold text-white">
              ${Number(summary.avg_social_spend).toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg bg-slate-800/60 p-2">
            <span className="text-slate-500">Avg Influencer</span>
            <p className="font-semibold text-white">
              ${Number(summary.avg_influencer_spend).toLocaleString()}
            </p>
          </div>
        </div>
      )}

      <div className="custom-scroll overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase text-slate-400">
              {columns.map((col) => (
                <th key={col} className="px-3 py-2 font-medium">
                  {COLUMN_LABELS[col] || col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {preview.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-white/5 transition hover:bg-white/5"
              >
                {columns.map((col) => (
                  <td key={col} className="px-3 py-2 text-slate-300">
                    {typeof row[col] === "number"
                      ? col.includes("revenue") || col.includes("spend")
                        ? `$${row[col].toLocaleString()}`
                        : row[col].toLocaleString()
                      : row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
