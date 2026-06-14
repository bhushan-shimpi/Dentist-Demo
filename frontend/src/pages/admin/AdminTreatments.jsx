import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';

const TREATMENTS = [
  { id: 'TRT-001', name: 'Root Canal Treatment', duration: '45 mins', price: '₹4,500', category: 'Endodontics' },
  { id: 'TRT-002', name: 'Teeth Whitening', duration: '60 mins', price: '₹3,000', category: 'Cosmetic' },
  { id: 'TRT-003', name: 'Dental Implants', duration: '90 mins', price: '₹25,000', category: 'Surgical' },
  { id: 'TRT-004', name: 'Dental Checkup', duration: '30 mins', price: '₹500', category: 'General' },
];

export default function AdminTreatments() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-poppins font-bold text-slate-900">Treatments</h2>
          <p className="text-slate-500 text-sm">Manage clinic services and pricing.</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4" /> Add Treatment
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Treatment Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Price (Starting at)</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TREATMENTS.map((trt, i) => (
                <motion.tr
                  key={trt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-slate-900">{trt.name}</td>
                  <td className="px-6 py-4">{trt.category}</td>
                  <td className="px-6 py-4">{trt.duration}</td>
                  <td className="px-6 py-4 font-semibold text-dental-600">{trt.price}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-dental-600 rounded-lg hover:bg-dental-50 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
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
