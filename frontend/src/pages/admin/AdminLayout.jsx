import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Calendar, FileText, CreditCard,
  BarChart2, Settings, Image, BookOpen, Stethoscope, Menu,
  X, MessageCircle, Bell, LogOut, ChevronRight,
} from 'lucide-react';
import { cn } from '../../utils/helpers';

const NAV_GROUPS = [
  {
    group: 'Main',
    items: [
      { label: 'Dashboard',     path: '/admin',              icon: <LayoutDashboard className="w-5 h-5" /> },
    ],
  },
  {
    group: 'Patients',
    items: [
      { label: 'All Patients',     path: '/admin/patients',     icon: <Users className="w-5 h-5" /> },
      { label: 'Appointments',     path: '/admin/appointments', icon: <Calendar className="w-5 h-5" /> },
    ],
  },
  {
    group: 'Content',
    items: [
      { label: 'WhatsApp',        path: '/admin/whatsapp',     icon: <MessageCircle className="w-5 h-5" /> },
    ],
  },
  {
    group: 'System',
    items: [
      { label: 'Settings',        path: '/admin/settings',     icon: <Settings className="w-5 h-5" /> },
    ],
  },
];

function Sidebar({ open, onClose }) {
  const { pathname } = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 bottom-0 z-40 w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300',
          'lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Admin navigation"
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-dental-gradient rounded-lg flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="block text-sm font-poppins font-bold text-white leading-none">DentaCare Pro</span>
              <span className="block text-[9px] text-slate-400 uppercase tracking-wide">Dentist Portal</span>
            </div>
          </Link>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-white/10" aria-label="Close sidebar">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {NAV_GROUPS.map(({ group, items }) => (
            <div key={group}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 mb-2">{group}</p>
              {items.map(({ label, path, icon }) => {
                const isActive = pathname === path || (path !== '/admin' && pathname.startsWith(path));
                return (
                  <Link
                    key={path}
                    to={path}
                    onClick={onClose}
                    className={cn(
                      'admin-sidebar-link',
                      isActive && 'admin-sidebar-link-active',
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {icon}
                    {label}
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3 px-3">
            <div className="w-8 h-8 bg-dental-gradient rounded-lg flex items-center justify-center text-xs font-bold text-white">RS</div>
            <div>
              <p className="text-xs font-semibold text-white">Dr. Rahul Sharma</p>
              <p className="text-[10px] text-slate-400">Lead Dentist</p>
            </div>
          </div>
          <Link to="/" className="admin-sidebar-link text-red-400 hover:bg-red-400/10 w-full">
            <LogOut className="w-4 h-4" /> Exit Portal
          </Link>
        </div>
      </aside>
    </>
  );
}

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:block">
            <h1 className="text-lg font-poppins font-semibold text-slate-900">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors" aria-label="Notifications">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 bg-dental-gradient rounded-xl flex items-center justify-center text-white text-xs font-bold">
              RS
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
