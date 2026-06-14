import { motion } from 'framer-motion';
import { Users, Calendar, DollarSign, ArrowUp, ArrowDown, Clock, Star } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

// Mock data
const STATS = [
  { label: 'Total Patients',     value: '10,248', change: '+12%', up: true,  icon: <Users className="w-5 h-5" />,    color: 'dental' },
  { label: 'Appointments Today', value: '24',      change: '+3',   up: true,  icon: <Calendar className="w-5 h-5" />, color: 'emerald' },
  { label: 'Avg Rating',         value: '4.9 ★',   change: '+0.1', up: true,  icon: <Star className="w-5 h-5" />,     color: 'amber' },
];

const REVENUE_DATA = [
  { month: 'Jan', revenue: 185000 },
  { month: 'Feb', revenue: 210000 },
  { month: 'Mar', revenue: 195000 },
  { month: 'Apr', revenue: 265000 },
  { month: 'May', revenue: 290000 },
  { month: 'Jun', revenue: 320000 },
];

const APPOINTMENTS_DATA = [
  { day: 'Mon', count: 14 },
  { day: 'Tue', count: 18 },
  { day: 'Wed', count: 22 },
  { day: 'Thu', count: 16 },
  { day: 'Fri', count: 24 },
  { day: 'Sat', count: 19 },
];

const SERVICE_DATA = [
  { name: 'General',    value: 35 },
  { name: 'Whitening',  value: 18 },
  { name: 'Implants',   value: 15 },
  { name: 'Orthodontic',value: 12 },
  { name: 'Root Canal', value: 12 },
  { name: 'Cosmetic',   value: 8 },
];

const PIE_COLORS = ['#2563eb', '#10b981', '#06b6d4', '#f59e0b', '#ef4444', '#8b5cf6'];

const RECENT_APPOINTMENTS = [
  { patient: 'Priya Mehta',     service: 'Teeth Whitening',   time: '09:00 AM', status: 'confirmed', avatar: 'https://i.pravatar.cc/40?img=1' },
  { patient: 'Arjun Patel',     service: 'Consultation',      time: '09:30 AM', status: 'arrived',   avatar: 'https://i.pravatar.cc/40?img=3' },
  { patient: 'Sneha Iyer',      service: 'Root Canal',        time: '10:00 AM', status: 'waiting',   avatar: 'https://i.pravatar.cc/40?img=5' },
  { patient: 'Vikram Singh',    service: 'Implant Follow-up', time: '10:30 AM', status: 'confirmed', avatar: 'https://i.pravatar.cc/40?img=7' },
  { patient: 'Ritu Agarwal',    service: 'General Check-up',  time: '11:00 AM', status: 'pending',   avatar: 'https://i.pravatar.cc/40?img=9' },
];

const statusColors = {
  confirmed: 'bg-dental-100 text-dental-700',
  arrived:   'bg-emerald-100 text-emerald-700',
  waiting:   'bg-amber-100 text-amber-700',
  pending:   'bg-slate-100 text-slate-600',
};

const colorMap = {
  dental:  { bg: 'bg-dental-50',  icon: 'bg-dental-600',  text: 'text-dental-600' },
  emerald: { bg: 'bg-emerald-50', icon: 'bg-emerald-600', text: 'text-emerald-600' },
  cyan:    { bg: 'bg-cyan-50',    icon: 'bg-cyan-600',    text: 'text-cyan-600' },
  amber:   { bg: 'bg-amber-50',   icon: 'bg-amber-500',   text: 'text-amber-600' },
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-poppins font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome back, Dr. Sharma. Here's what's happening today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {STATS.map((stat, i) => {
          const colors = colorMap[stat.color];
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-soft p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${colors.icon} text-white rounded-xl flex items-center justify-center`}>
                  {stat.icon}
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>
                  {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-poppins font-bold text-slate-900">{stat.value}</div>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>



      {/* Appointments this week */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-6">
          <h2 className="font-semibold text-slate-900 mb-5">Appointments This Week</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={APPOINTMENTS_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Today's appointments */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-slate-900">Today's Appointments</h2>
            <span className="badge bg-dental-100 text-dental-700 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {new Date().toLocaleDateString('en-IN',{weekday:'long'})}
            </span>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-56">
            {RECENT_APPOINTMENTS.map((appt, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <img src={appt.avatar} alt={appt.patient} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{appt.patient}</p>
                  <p className="text-xs text-slate-500 truncate">{appt.service}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-semibold text-slate-800">{appt.time}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${statusColors[appt.status]}`}>
                    {appt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
