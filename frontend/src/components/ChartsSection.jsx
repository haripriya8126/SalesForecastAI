import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PIE_COLORS = ["#38bdf8", "#a78bfa", "#34d399", "#fbbf24", "#f472b6"];
const tooltipStyle = {
  backgroundColor: "rgba(15, 23, 42, 0.95)",
  border: "1px solid rgba(56, 189, 248, 0.3)",
  borderRadius: "8px",
  color: "#e2e8f0",
};

function ChartCard({ title, children }) {
  return (
    <motion.div
      className="glass-card p-4 sm:p-5"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="mb-3 text-sm font-semibold text-slate-200">{title}</h3>
      <div className="h-64 w-full min-h-[256px]">{children}</div>
    </motion.div>
  );
}

/** Six Recharts visualizations with gradients, legends, and tooltips */
export default function ChartsSection({ chartData }) {
  const data = chartData || {};
  const salesTrend = data.sales_trend?.length ? data.sales_trend : [{ month: "M1", revenue: 1 }];
  const adSpend = data.advertising_spend?.length
    ? data.advertising_spend
    : [{ channel: "TV", spend: 1 }];
  const platformPerf = data.platform_performance?.length
    ? data.platform_performance
    : [{ name: "E-commerce", value: 1 }];
  const revenueGrowth = data.revenue_growth?.length
    ? data.revenue_growth
    : [{ period: "P1", revenue: 1 }];
  const featureImp = data.feature_importance?.length
    ? data.feature_importance
    : [{ name: "TV", value: 0.2 }];
  const regional = data.regional_sales?.length
    ? data.regional_sales
    : [{ region: "NA", sales: 1 }];

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold gradient-text">Analytics Charts</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {/* 1. Sales trend line */}
        <ChartCard title="Sales Trend (Monthly Avg Revenue)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesTrend}>
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="url(#lineGrad)"
                strokeWidth={3}
                dot={{ fill: "#38bdf8", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 2. Advertising spend bar */}
        <ChartCard title="Advertising Spend by Channel">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={adSpend}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="channel" stroke="#94a3b8" fontSize={10} />
              <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`$${Number(v).toLocaleString()}`, "Spend"]} />
              <Legend />
              <Bar dataKey="spend" name="Avg Spend" fill="url(#barGrad)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 3. Platform performance pie */}
        <ChartCard title="Platform Performance (Total Revenue)">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={platformPerf}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={3}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {platformPerf.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => `$${Number(v).toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 4. Revenue growth area */}
        <ChartCard title="Revenue Growth by Period">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueGrowth}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="period" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]} />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Avg Revenue"
                stroke="#a78bfa"
                fill="url(#areaGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 5. Feature importance bar */}
        <ChartCard title="Feature Importance (ML Model)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={featureImp} layout="vertical" margin={{ left: 20 }}>
              <defs>
                <linearGradient id="featGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis type="number" stroke="#94a3b8" fontSize={11} />
              <YAxis type="category" dataKey="name" stroke="#94a3b8" width={110} fontSize={10} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar dataKey="value" name="Importance" fill="url(#featGrad)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 6. Regional sales comparison */}
        <ChartCard title="Regional Sales Comparison">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regional}>
              <defs>
                <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="region" stroke="#94a3b8" fontSize={9} angle={-15} textAnchor="end" height={60} />
              <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`$${Number(v).toLocaleString()}`, "Sales"]} />
              <Legend />
              <Bar dataKey="sales" name="Avg Sales" fill="url(#regGrad)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </section>
  );
}
