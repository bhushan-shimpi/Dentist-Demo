import { motion } from 'framer-motion';
import { CreditCard, Download, Eye, Plus } from 'lucide-react';

const INVOICES = [
  { id: 'INV-2026-001', patient: 'Rahul Deshmukh', amount: '₹4,500', date: '14 Jun 2026', status: 'Paid' },
  { id: 'INV-2026-002', patient: 'Neha Gupta', amount: '₹500', date: '14 Jun 2026', status: 'Pending' },
  { id: 'INV-2026-003', patient: 'Amit Patel', amount: '₹3,000', date: '12 Jun 2026', status: 'Paid' },
  { id: 'INV-2026-004', patient: 'Priya Sharma', amount: '₹25,000', date: '10 Jun 2026', status: 'Overdue' },
];

const statusStyles = {
  Paid: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Overdue: 'bg-red-100 text-red-700',
};

export default function AdminBilling() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-poppins font-bold text-slate-900">Billing & Invoices</h2>
          <p className="text-slate-500 text-sm">Manage patient payments and generate invoices.</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4" /> Create Invoice
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">Patient Name</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INVOICES.map((inv, i) => (
                <motion.tr
                  key={inv.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-900">{inv.id}</td>
                  <td className="px-6 py-4 font-semibold text-dental-700">{inv.patient}</td>
                  <td className="px-6 py-4 font-bold">{inv.amount}</td>
                  <td className="px-6 py-4">{inv.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusStyles[inv.status]}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-dental-600 rounded-lg hover:bg-dental-50 transition-colors" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors" title="Download">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
