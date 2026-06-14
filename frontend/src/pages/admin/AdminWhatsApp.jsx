import { motion } from 'framer-motion';
import { MessageCircle, Send, Check } from 'lucide-react';

export default function AdminWhatsApp() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-poppins font-bold text-slate-900">WhatsApp Integration</h2>
        <p className="text-slate-500 text-sm">Send appointment reminders and updates to patients via WhatsApp.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-emerald-500" /> Send Message
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Select Audience</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20">
                <option>All Patients</option>
                <option>Upcoming Appointments (Tomorrow)</option>
                <option>Missed Appointments</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message Template</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20">
                <option>Appointment Reminder</option>
                <option>Feedback Request</option>
                <option>Clinic Holiday Notice</option>
                <option>Custom Message</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message Preview</label>
              <textarea
                rows={4}
                defaultValue={"Hello [Name],\n\nThis is a friendly reminder from DentaCare Pro about your upcoming appointment on [Date] at [Time].\n\nPlease reply YES to confirm."}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <button className="w-full btn-emerald py-3 flex justify-center mt-2">
              <Send className="w-4 h-4" /> Send WhatsApp Message
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Broadcasts</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Appointment Reminder (Tomorrow)</p>
                  <p className="text-xs text-slate-500 mt-1">Sent to 12 patients • Today, 9:00 AM</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
