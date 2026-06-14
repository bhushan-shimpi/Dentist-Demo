import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Edit, Trash2, X } from 'lucide-react';

const INITIAL_PATIENTS = [
  { id: 'PT-001', name: 'Rahul Deshmukh', phone: '+91 98765 43210', lastVisit: '12 Jun 2026', status: 'Active' },
  { id: 'PT-002', name: 'Priya Sharma', phone: '+91 98765 43211', lastVisit: '10 Jun 2026', status: 'Active' },
  { id: 'PT-003', name: 'Amit Patel', phone: '+91 98765 43212', lastVisit: '05 May 2026', status: 'Inactive' },
];

export default function AdminPatients() {
  const [patients, setPatients] = useState(INITIAL_PATIENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('All Time');
  const [sortOrder, setSortOrder] = useState('Desc');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', lastVisit: '', status: 'Active' });

  // Delete State
  const [patientToDelete, setPatientToDelete] = useState(null);

  // Handlers
  const handleOpenModal = (patient = null) => {
    if (patient) {
      setEditingPatient(patient);
      setFormData(patient);
    } else {
      setEditingPatient(null);
      setFormData({ name: '', phone: '', lastVisit: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), status: 'Active' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPatient(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingPatient) {
      setPatients(patients.map(p => p.id === editingPatient.id ? { ...formData, id: p.id } : p));
    } else {
      const newId = `PT-00${patients.length + 4}`;
      setPatients([{ ...formData, id: newId }, ...patients]);
    }
    handleCloseModal();
  };

  const handleDeleteConfirm = () => {
    if (patientToDelete) {
      setPatients(patients.filter(p => p.id !== patientToDelete.id));
      setPatientToDelete(null);
    }
  };

  const filtered = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (dateFilter === 'All Time') return matchesSearch;
    
    const itemDate = new Date(p.lastVisit);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = itemDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (dateFilter === 'Today') return matchesSearch && diffDays === 0;
    if (dateFilter === 'Last 7 Days') return matchesSearch && diffDays <= 0 && diffDays >= -7;
    if (dateFilter === 'Last 30 Days') return matchesSearch && diffDays <= 0 && diffDays >= -30;
    return matchesSearch;
  }).sort((a, b) => {
    const dateA = new Date(a.lastVisit);
    const dateB = new Date(b.lastVisit);
    return sortOrder === 'Desc' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-poppins font-bold text-slate-900">Patients</h2>
          <p className="text-slate-500 text-sm">Manage patient records and history.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Patient
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-dental-500"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto sm:ml-auto">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-dental-500"
            >
              <option value="All Time">All Time</option>
              <option value="Today">Today</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-dental-500"
            >
              <option value="Desc">Newest First</option>
              <option value="Asc">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden divide-y divide-slate-100">
          {filtered.map((patient, i) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-dental-700">{patient.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{patient.phone}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${patient.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                  {patient.status}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                <div className="text-xs text-slate-400">
                  <span className="block">ID: {patient.id}</span>
                  <span className="block mt-0.5">Visited: {patient.lastVisit}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenModal(patient)} className="p-1.5 text-slate-400 hover:text-dental-600 rounded-lg hover:bg-dental-50 transition-colors bg-white border border-slate-200 shadow-sm">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => setPatientToDelete(patient)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors bg-white border border-slate-200 shadow-sm">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-sm">
              No patients found.
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Last Visit</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((patient, i) => (
                <motion.tr
                  key={patient.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-dental-700">{patient.name}</td>
                  <td className="px-6 py-4">{patient.phone}</td>
                  <td className="px-6 py-4">{patient.lastVisit}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${patient.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button onClick={() => handleOpenModal(patient)} className="p-1.5 text-slate-400 hover:text-dental-600 rounded-lg hover:bg-dental-50 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => setPatientToDelete(patient)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No patients found.
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={handleCloseModal} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-xl font-bold text-slate-900">{editingPatient ? 'Edit Patient' : 'Add New Patient'}</h3>
                <button onClick={handleCloseModal} className="p-1 text-slate-400 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-field" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input required type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="input-field" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Visit</label>
                  <input required type="text" value={formData.lastVisit} onChange={e => setFormData({...formData, lastVisit: e.target.value})} className="input-field" placeholder="12 Jun 2026" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="input-field">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={handleCloseModal} className="btn-secondary">Cancel</button>
                  <button type="submit" className="btn-primary">Save Patient</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {patientToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setPatientToDelete(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Patient?</h3>
              <p className="text-sm text-slate-500 mb-6">Are you sure you want to delete <strong>{patientToDelete.name}</strong>? This action cannot be undone.</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => setPatientToDelete(null)} className="btn-secondary">Cancel</button>
                <button onClick={handleDeleteConfirm} className="btn-primary bg-red-600 hover:bg-red-700 shadow-red-500/30">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
