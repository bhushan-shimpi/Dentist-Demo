import { Save } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-poppins font-bold text-slate-900">Settings</h2>
        <p className="text-slate-500 text-sm">Manage clinic configuration and preferences.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Clinic Information</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Clinic Name</label>
              <input type="text" defaultValue="DentaCare Pro" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-dental-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact Phone</label>
              <input type="text" defaultValue="+91 98765 43210" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-dental-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
              <input type="text" defaultValue="123 Health Avenue, Kothrud, Pune" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-dental-500" />
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-dental-600 rounded" />
              <span className="text-sm text-slate-700">Email notifications for new appointments</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-dental-600 rounded" />
              <span className="text-sm text-slate-700">SMS notifications for new appointments</span>
            </label>
          </div>
        </div>

        <div className="p-6 bg-slate-50 flex justify-end">
          <button className="btn-primary">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
