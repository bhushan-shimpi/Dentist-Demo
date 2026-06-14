import { motion } from 'framer-motion';
import { FileText, Download, Eye, Plus } from 'lucide-react';

const PRESCRIPTIONS = [
  { id: 'RX-8021', patient: 'Rahul Deshmukh', doctor: 'Dr. Rahul Sharma', date: '14 Jun 2026' },
  { id: 'RX-8020', patient: 'Sanjay Kumar', doctor: 'Dr. Rahul Sharma', date: '12 Jun 2026' },
  { id: 'RX-8019', patient: 'Neha Gupta', doctor: 'Dr. Anita Desai', date: '10 Jun 2026' },
];

export default function AdminPrescriptions() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-poppins font-bold text-slate-900">Prescriptions</h2>
          <p className="text-slate-500 text-sm">Issue and manage digital prescriptions.</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4" /> New Prescription
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PRESCRIPTIONS.map((rx, i) => (
          <motion.div
            key={rx.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{rx.id}</p>
                  <p className="text-xs text-slate-500">{rx.date}</p>
                </div>
              </div>
            </div>
            <div className="space-y-2 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Patient:</span>
                <span className="font-medium text-slate-900">{rx.patient}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Prescribed by:</span>
                <span className="font-medium text-slate-900">{rx.doctor}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
              <button className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                <Eye className="w-4 h-4" /> View
              </button>
              <button className="flex-1 py-2 bg-dental-50 hover:bg-dental-100 text-dental-600 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
