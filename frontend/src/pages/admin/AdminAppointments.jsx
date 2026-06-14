import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, CheckCircle, XCircle, Trash2, Edit, Plus, X, Phone } from 'lucide-react';

const INITIAL_APPOINTMENTS = [
  { id: 'APT-101', patient: 'Rahul Deshmukh', phone: '+91 98765 43210', type: 'Root Canal', date: '14 Jun 2026', time: '10:00 AM', status: 'Confirmed' },
  { id: 'APT-102', patient: 'Neha Gupta', phone: '+91 98765 43211', type: 'Consultation', date: '14 Jun 2026', time: '11:30 AM', status: 'Pending' },
  { id: 'APT-103', patient: 'Amit Patel', phone: '+91 98765 43212', type: 'Teeth Whitening', date: '14 Jun 2026', time: '02:00 PM', status: 'Confirmed' },
];

const statusStyles = {
  Confirmed: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Completed: 'bg-blue-100 text-blue-700',
  Cancelled: 'bg-red-100 text-red-700',
};

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('All Time');
  const [sortOrder, setSortOrder] = useState('Desc');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApt, setEditingApt] = useState(null);
  const [formData, setFormData] = useState({ patient: '', phone: '', type: 'Consultation', date: '', time: '', status: 'Pending' });

  // Handlers
  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(appointments.filter(a => a.id !== id));
    }
  };

  const handleOpenModal = (apt = null) => {
    if (apt) {
      setEditingApt(apt);
      setFormData(apt);
    } else {
      setEditingApt(null);
      setFormData({ patient: '', phone: '', type: 'Consultation', date: '', time: '', status: 'Pending' });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingApt) {
      setAppointments(appointments.map(a => a.id === editingApt.id ? { ...formData, id: a.id } : a));
    } else {
      const newId = `APT-10${appointments.length + 4}`;
      setAppointments([{ ...formData, id: newId }, ...appointments]);
    }
    setIsModalOpen(false);
  };

  const filtered = appointments.filter(a => {
    const matchesSearch = a.patient.toLowerCase().includes(searchTerm.toLowerCase()) || a.id.toLowerCase().includes(searchTerm.toLowerCase());
    if (dateFilter === 'All Time') return matchesSearch;
    
    const itemDate = new Date(a.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = itemDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (dateFilter === 'Today') return matchesSearch && diffDays === 0;
    if (dateFilter === 'Last 7 Days') return matchesSearch && diffDays <= 0 && diffDays >= -7;
    if (dateFilter === 'Next 7 Days') return matchesSearch && diffDays >= 0 && diffDays <= 7;
    if (dateFilter === 'Last 30 Days') return matchesSearch && diffDays <= 0 && diffDays >= -30;
    return matchesSearch;
  }).sort((a, b) => {
    const dateA = new Date(a.date + ' ' + a.time);
    const dateB = new Date(b.date + ' ' + b.time);
    return sortOrder === 'Desc' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-poppins font-bold text-slate-900">Appointments</h2>
          <p className="text-slate-500 text-sm">Schedule and manage clinic appointments.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary">
          <Plus className="w-4 h-4" /> New Booking
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by patient or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-dental-500"
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
              <option value="Next 7 Days">Next 7 Days</option>
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
          {filtered.map((apt, i) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{apt.patient}</h3>
                  {apt.phone && (
                    <a href={`tel:${apt.phone}`} className="flex items-center gap-1 mt-1 text-xs text-dental-600 hover:text-dental-700">
                      <Phone className="w-3 h-3" /> {apt.phone}
                    </a>
                  )}
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyles[apt.status]}`}>
                  {apt.status}
                </span>
              </div>
              <div className="text-xs text-slate-600 mb-3 space-y-1">
                <div className="font-medium text-slate-800">{apt.type}</div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> {apt.date} • <Clock className="w-3.5 h-3.5 ml-1 text-slate-400" /> {apt.time}
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                <div className="text-[10px] text-slate-400">ID: {apt.id}</div>
                <div className="flex gap-2">
                  {apt.status === 'Pending' && (
                    <button onClick={() => handleStatusChange(apt.id, 'Confirmed')} className="px-2.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors bg-white border border-slate-200 shadow-sm flex items-center gap-1.5" title="Confirm">
                      <CheckCircle className="w-3.5 h-3.5" /> Confirm
                    </button>
                  )}
                  {apt.status === 'Confirmed' && (
                    <button onClick={() => handleStatusChange(apt.id, 'Completed')} className="px-2.5 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-50 rounded-lg transition-colors bg-white border border-slate-200 shadow-sm flex items-center gap-1.5" title="Mark Completed">
                      <CheckCircle className="w-3.5 h-3.5" /> Complete
                    </button>
                  )}
                  <button onClick={() => handleOpenModal(apt)} className="p-1.5 text-slate-400 hover:text-dental-600 rounded-lg hover:bg-dental-50 transition-colors bg-white border border-slate-200 shadow-sm" title="Edit">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(apt.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors bg-white border border-slate-200 shadow-sm" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-sm">
              No appointments found.
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Patient Name</th>
                <th className="px-6 py-4">Treatment</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((apt, i) => (
                <motion.tr
                  key={apt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{apt.patient}</div>
                    {apt.phone && (
                      <a href={`tel:${apt.phone}`} className="flex items-center gap-1 mt-1 text-xs text-dental-600 hover:text-dental-700">
                        <Phone className="w-3 h-3" /> {apt.phone}
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4">{apt.type}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-900">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {apt.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <Clock className="w-3.5 h-3.5" /> {apt.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusStyles[apt.status]}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    {apt.status === 'Pending' && (
                      <button onClick={() => handleStatusChange(apt.id, 'Confirmed')} className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5" title="Confirm">
                        <CheckCircle className="w-4 h-4" /> Confirm
                      </button>
                    )}
                    {apt.status === 'Confirmed' && (
                      <button onClick={() => handleStatusChange(apt.id, 'Completed')} className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1.5" title="Mark Completed">
                        <CheckCircle className="w-4 h-4" /> Complete
                      </button>
                    )}
                    <button onClick={() => handleOpenModal(apt)} className="p-1.5 text-slate-400 hover:text-dental-600 rounded-lg hover:bg-dental-50 transition-colors" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(apt.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No appointments found.
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-xl font-bold text-slate-900">{editingApt ? 'Edit Appointment' : 'New Booking'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name</label>
                    <input required type="text" value={formData.patient} onChange={e => setFormData({...formData, patient: e.target.value})} className="input-field" placeholder="Patient Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
                    <input required type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="input-field" placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Treatment Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="input-field">
                    <option>Consultation</option>
                    <option>Root Canal</option>
                    <option>Teeth Whitening</option>
                    <option>Dental Implant</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                    <input required type="text" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="input-field" placeholder="14 Jun 2026" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                    <input required type="text" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="input-field" placeholder="10:00 AM" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="input-field">
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancel</button>
                  <button type="submit" className="btn-primary">Save Appointment</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
