import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const POSTS = [
  { id: 'B-001', title: '5 Tips for a Healthier Smile', date: '12 Jun 2026', views: '1.2K', status: 'Published' },
  { id: 'B-002', title: 'What to Expect During a Root Canal', date: '05 Jun 2026', views: '850', status: 'Published' },
  { id: 'B-003', title: 'The Benefits of Invisalign', date: '01 Jun 2026', views: '2.1K', status: 'Published' },
  { id: 'B-004', title: 'Child Dental Care Guide', date: '-', views: '-', status: 'Draft' },
];

export default function AdminBlog() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-poppins font-bold text-slate-900">Blog Posts</h2>
          <p className="text-slate-500 text-sm">Write and manage articles for your patients.</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4" /> Write New Post
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Views</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {POSTS.map((post, i) => (
                <motion.tr
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-slate-900">{post.title}</td>
                  <td className="px-6 py-4">{post.date}</td>
                  <td className="px-6 py-4 font-medium">{post.views}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${post.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-dental-600 rounded-lg hover:bg-dental-50 transition-colors" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors" title="Delete">
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
