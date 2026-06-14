import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Phone, Mail, User, AlertCircle } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

// Mock patient data
const MOCK_PATIENTS = {
  '9876543210': {
    id: 'P-001',
    name: 'Priya Mehta',
    age: 32,
    gender: 'Female',
    phone: '9876543210',
    email: 'priya@example.com',
    bloodGroup: 'B+',
    lastVisit: '2026-06-01',
    nextAppointment: {
      date: '2026-06-20',
      time: '10:30 AM',
      service: 'Teeth Whitening',
      doctor: 'Dr. Rahul Sharma',
      id: 'APT-20240620-001',
    },
    visits: [
      { date: '2026-06-01', service: 'General Check-up',   doctor: 'Dr. Rahul Sharma', notes: 'All good. Minor cleaning done.' },
      { date: '2026-03-15', service: 'Teeth Whitening',    doctor: 'Dr. Rahul Sharma', notes: 'Whitening completed. 7 shades improvement.' },
      { date: '2025-11-10', service: 'Root Canal – #36',   doctor: 'Dr. Rahul Sharma', notes: 'RCT completed. Crown placed.' },
      { date: '2025-07-22', service: 'Consultation',       doctor: 'Dr. Rahul Sharma', notes: 'New patient intake. Treatment plan discussed.' },
    ],
    prescriptions: [
      { date: '2026-06-01', medicines: ['Amoxicillin 500mg – 5 days', 'Ibuprofen 400mg – as needed', 'Chlorhexidine mouthwash – 2 weeks'] },
      { date: '2025-11-10', medicines: ['Metronidazole 400mg – 7 days', 'Diclofenac 50mg – 3 days', 'Vitamin C 1000mg – 1 month'] },
    ],
    billing: [
      { date: '2026-06-01', service: 'General Check-up + Cleaning', amount: 1500, paid: true,  id: 'INV-001' },
      { date: '2026-03-15', service: 'Teeth Whitening',             amount: 8500, paid: true,  id: 'INV-002' },
      { date: '2025-11-10', service: 'Root Canal Treatment',        amount: 12000, paid: true, id: 'INV-003' },
    ],
  },
};

function SearchPage({ onSearch }) {
  const [mode, setMode] = useState('phone');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!value.trim()) { setError('Please enter a value to search'); return; }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800)); // Simulate API
    const patient = mode === 'phone'
      ? MOCK_PATIENTS[value.replace(/\D/g, '')]
      : Object.values(MOCK_PATIENTS).find(p => p.email === value);
    setLoading(false);
    if (patient) onSearch(patient);
    else setError('No patient records found. Please check the details and try again.');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 pt-24 pb-10 md:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-dental-gradient p-8 text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-poppins font-bold">Patient History</h1>
            <p className="text-dental-100 text-sm mt-1">Find your records securely</p>
          </div>

          {/* Form */}
          <div className="p-8 space-y-6">
            {/* Mode toggle */}
            <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
              <button
                onClick={() => { setMode('phone'); setValue(''); setError(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  mode === 'phone' ? 'bg-white shadow-sm text-dental-700' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Phone className="w-4 h-4" /> Mobile
              </button>
              <button
                onClick={() => { setMode('email'); setValue(''); setError(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  mode === 'email' ? 'bg-white shadow-sm text-dental-700' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Mail className="w-4 h-4" /> Email
              </button>
            </div>

            {/* Input */}
            <div>
              <Input
                id="search-input"
                label={mode === 'phone' ? 'Mobile Number' : 'Email Address'}
                placeholder={mode === 'phone' ? 'Enter 10-digit mobile number' : 'Enter your email address'}
                type={mode === 'phone' ? 'tel' : 'email'}
                value={value}
                onChange={e => { setValue(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                icon={mode === 'phone' ? <Phone className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-500 flex items-center gap-1.5"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </motion.p>
              )}
            </div>

            <Button
              onClick={handleSearch}
              loading={loading}
              size="lg"
              className="w-full justify-center"
              icon={!loading && <Search className="w-5 h-5" />}
              aria-label="Search patient records"
            >
              {loading ? 'Searching…' : 'Search Records'}
            </Button>

            <p className="text-xs text-center text-slate-400">
              Try: <span
                className="text-dental-600 cursor-pointer hover:underline"
                onClick={() => { setMode('phone'); setValue('9876543210'); }}
              >
                9876543210
              </span> as a demo
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function PatientDashboard({ patient: initialPatient, onBack }) {
  const [patient, setPatient] = useState(initialPatient);
  const [activeTab, setActiveTab] = useState('overview');

  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleSlot, setRescheduleSlot] = useState('');

  const SLOTS = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
    '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'
  ];

  const handleSaveReschedule = () => {
    if (rescheduleDate && rescheduleSlot) {
      setPatient({
        ...patient,
        nextAppointment: {
          ...patient.nextAppointment,
          date: rescheduleDate,
          time: rescheduleSlot
        }
      });
      setShowReschedule(false);
    }
  };

  const TABS = [
    { id: 'overview',      label: 'Overview' },
    { id: 'visits',        label: 'Visit History' },
  ];

  return (
    <div className="container-custom pt-24 pb-10 md:pt-32 max-w-5xl">
      {/* Back */}
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors">
        ← Search Again
      </button>

      {/* Patient Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dental-gradient text-white rounded-3xl p-7 mb-8 shadow-glow"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl font-bold text-white flex-shrink-0">
            {patient.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-poppins font-bold">{patient.name}</h2>
            <p className="text-dental-100 text-sm">ID: {patient.id} &nbsp;·&nbsp; {patient.age} yrs &nbsp;·&nbsp; {patient.gender} &nbsp;·&nbsp; {patient.bloodGroup}</p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm">
              <span className="flex items-center gap-1.5 text-dental-100"><Phone className="w-3.5 h-3.5" /> {patient.phone}</span>
              <span className="flex items-center gap-1.5 text-dental-100"><Mail className="w-3.5 h-3.5" /> {patient.email}</span>
            </div>
          </div>
          {patient.nextAppointment && (
            <div className="glass-dark rounded-2xl p-4 text-center flex-shrink-0">
              <p className="text-xs text-dental-200 mb-1">Next Appointment</p>
              <p className="font-bold text-white">{new Date(patient.nextAppointment.date).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}</p>
              <p className="text-dental-100 text-xs">{patient.nextAppointment.time}</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 mb-8 overflow-x-auto hide-scrollbar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-dental-600 text-dental-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'overview' && (
            <div className="grid sm:grid-cols-1 gap-5">
              <div className="stat-card"><div className="text-3xl font-bold text-dental-700">{patient.visits.length}</div><p className="text-sm text-slate-500 mt-1">Total Visits</p></div>
              {patient.nextAppointment && (
                <div className="sm:col-span-3 bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <h3 className="font-semibold text-emerald-800 flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Upcoming Appointment
                    </h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setRescheduleDate(patient.nextAppointment.date);
                          setRescheduleSlot(patient.nextAppointment.time);
                          setShowReschedule(true);
                        }}
                        className="text-xs font-bold px-3 py-1.5 bg-white border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors"
                      >
                        Reschedule
                      </button>
                      <button 
                        onClick={() => {
                          if(confirm("Are you sure you want to cancel this appointment?")) {
                            setPatient({...patient, nextAppointment: null});
                          }
                        }}
                        className="text-xs font-bold px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div><span className="text-slate-500 text-xs">Service</span><p className="font-semibold">{patient.nextAppointment.service}</p></div>
                    <div><span className="text-slate-500 text-xs">Date</span><p className="font-semibold">{new Date(patient.nextAppointment.date).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}</p></div>
                    <div><span className="text-slate-500 text-xs">Time</span><p className="font-semibold">{patient.nextAppointment.time}</p></div>
                    <div><span className="text-slate-500 text-xs">Doctor</span><p className="font-semibold">{patient.nextAppointment.doctor}</p></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'visits' && (
            <div className="space-y-4">
              {patient.visits.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex gap-5 bg-white rounded-2xl border border-slate-100 shadow-soft p-5"
                >
                  <div className="flex-shrink-0 w-14 text-center">
                    <div className="text-xl font-bold text-dental-700">{new Date(v.date).getDate()}</div>
                    <div className="text-xs text-slate-500">{new Date(v.date).toLocaleDateString('en-IN',{month:'short'})}</div>
                    <div className="text-xs text-slate-400">{new Date(v.date).getFullYear()}</div>
                  </div>
                  <div className="flex-1 border-l border-slate-100 pl-5">
                    <h4 className="font-semibold text-slate-900">{v.service}</h4>
                    <p className="text-sm text-slate-500">{v.doctor}</p>
                    <p className="text-sm text-slate-600 mt-1 italic">"{v.notes}"</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <Modal isOpen={showReschedule} onClose={() => setShowReschedule(false)} title="Reschedule Appointment" size="md">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Select New Date</label>
            <input 
              type="date" 
              className="w-full pl-4 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-soft text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-dental-400"
              value={rescheduleDate}
              onChange={(e) => setRescheduleDate(e.target.value)}
            />
          </div>
          {rescheduleDate && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Available Slots</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {SLOTS.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setRescheduleSlot(slot)}
                    className={`py-2 px-2 rounded-xl text-xs font-medium transition-all duration-150 ${
                      rescheduleSlot === slot
                        ? 'bg-dental-gradient text-white shadow-md scale-105'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-dental-400 hover:bg-dental-50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button onClick={() => setShowReschedule(false)} className="px-5 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
              Cancel
            </button>
            <button 
              onClick={handleSaveReschedule} 
              disabled={!rescheduleDate || !rescheduleSlot}
              className="px-5 py-2 text-sm font-semibold text-white bg-dental-600 hover:bg-dental-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors shadow-md"
            >
              Confirm Reschedule
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// Need to import AnimatePresence at top
import { AnimatePresence } from 'framer-motion';

export default function PatientHistory() {
  const [patient, setPatient] = useState(null);

  if (patient) {
    return <PatientDashboard patient={patient} onBack={() => setPatient(null)} />;
  }

  return <SearchPage onSearch={setPatient} />;
}
