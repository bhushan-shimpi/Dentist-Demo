import { motion } from 'framer-motion';
import { Image as ImageIcon, UploadCloud, Trash2 } from 'lucide-react';

const IMAGES = [
  { id: 1, src: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=400&q=80', title: 'Clinic Reception' },
  { id: 2, src: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=400&q=80', title: 'Treatment Room 1' },
  { id: 3, src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80', title: 'Advanced Equipment' },
];

export default function AdminGallery() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-poppins font-bold text-slate-900">Gallery Management</h2>
          <p className="text-slate-500 text-sm">Upload and manage clinic photos and before/after shots.</p>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center bg-white hover:bg-slate-50 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[200px]">
        <div className="w-16 h-16 bg-dental-50 rounded-full flex items-center justify-center mb-4">
          <UploadCloud className="w-8 h-8 text-dental-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-1">Upload New Images</h3>
        <p className="text-sm text-slate-500 max-w-md">Drag and drop your images here, or click to browse files. Supports JPG, PNG up to 5MB.</p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {IMAGES.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group relative rounded-2xl overflow-hidden shadow-soft aspect-square bg-slate-100"
          >
            <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
              <p className="text-white text-sm font-semibold text-center mb-3">{img.title}</p>
              <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
