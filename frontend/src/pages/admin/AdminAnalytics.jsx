import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, Users, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';

const KPIS = [
  { label: 'Total Revenue', value: '₹4,50,000', trend: '+12.5%', isUp: true, icon: <DollarSign className="w-5 h-5" /> },
  { label: 'New Patients', value: '124', trend: '+8.2%', isUp: true, icon: <Users className="w-5 h-5" /> },
  { label: 'Avg Treatment Value', value: '₹12,500', trend: '-2.4%', isUp: false, icon: <TrendingUp className="w-5 h-5" /> },
  { label: 'Patient Retention', value: '86%', trend: '+4.1%', isUp: true, icon: <BarChart2 className="w-5 h-5" /> },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-poppins font-bold text-slate-900">Analytics Overview</h2>
          <p className="text-slate-500 text-sm">Detailed performance metrics for your clinic.</p>
        </div>
        <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium outline-none">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {KPIS.map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-dental-50 text-dental-600 rounded-lg">
                {kpi.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${kpi.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {kpi.isUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {kpi.trend}
              </div>
            </div>
            <p className="text-sm text-slate-500 font-medium">{kpi.label}</p>
            <h3 className="text-2xl font-poppins font-bold text-slate-900 mt-1">{kpi.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Placeholder Chart Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft min-h-[400px] flex items-center justify-center"
      >
        <div className="text-center text-slate-400">
          <BarChart2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="font-medium">Revenue Trend Chart Placeholder</p>
          <p className="text-sm">Integrate with Chart.js or Recharts here.</p>
        </div>
      </motion.div>
    </div>
  );
}
