import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Quote, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { adminService, Testimonial } from '../services/adminService';

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote: "OrbitSol has completely transformed our strata processing. What used to take days of manual transcription and template entry now gets handled within hours by their managed offshore operating desk. Highly reliable.",
    author: "Strata Director",
    role: "Managing Director",
    company: "Metro Strata Partners",
    order: 1
  },
  {
    quote: "We process over 2,000 property layouts and routine inspection reports per year. OrbitSol's accuracy, template discipline, and quick turnarounds are unmatched in the offshore industry.",
    author: "Lettings Operations Lead",
    role: "Head of Property Management",
    company: "UK Premium Lettings Group",
    order: 2
  },
  {
    quote: "Our backlogs vanished once we integrated OrbitSol as our outsourced typing and data partner. They scale seamlessly with our busy periods and are an essential extension of our firm.",
    author: "Senior Partner",
    role: "Senior Legal Practitioner",
    company: "Apex Legal & Professional Services",
    order: 3
  },
  {
    quote: "The OrbitSol team have been instrumental in allowing us to scale our operations without the overhead of local hiring. Their ability to document processes while executing them is a game-changer for any growing business.",
    author: "Managing Director",
    role: "Managing Director",
    company: "Property Technology Group",
    order: 4
  },
  {
    quote: "OrbitSol's strata associates operate as an extension of our portfolio management team, working directly in our systems to handle the administrative volume that previously overwhelmed our strata managers.",
    author: "Strata Principal",
    role: "Strata Principal",
    company: "Strata Management Group",
    order: 5
  }
];

export const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const data = await adminService.getTestimonials();
      if (data && data.length > 0) {
        setTestimonials(data);
      } else {
        console.log("No testimonials found in database, auto-bootstrapping defaults...");
        await adminService.bootstrapTestimonials(DEFAULT_TESTIMONIALS);
        const refreshedData = await adminService.getTestimonials();
        setTestimonials(refreshedData || DEFAULT_TESTIMONIALS);
      }
    } catch (error) {
      console.error("Fetch testimonials error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBootstrapTestimonials = async () => {
    if (window.confirm("Initialize testimonials with default data?")) {
      try {
        setSubmitting(true);
        await adminService.bootstrapTestimonials(DEFAULT_TESTIMONIALS);
        await fetchTestimonials();
      } catch (error) {
        console.error("Bootstrap testimonials error:", error);
        alert("Failed to initialize testimonials. Please check console.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const formData = new FormData(e.currentTarget);
      const quote = formData.get('quote') as string;
      const author = formData.get('author') as string;
      const role = formData.get('role') as string;
      const company = formData.get('company') as string;
      const order = Number(formData.get('order')) || (testimonials.length + 1);

      if (!quote || !author || !role || !company) {
        alert("Please fill out all fields.");
        return;
      }

      const testimonialData: Partial<Testimonial> = {
        quote,
        author,
        role,
        company,
        order
      };

      if (editingTestimonial?.id) {
        testimonialData.id = editingTestimonial.id;
      }

      await adminService.saveTestimonial(testimonialData);
      setIsFormOpen(false);
      setEditingTestimonial(null);
      await fetchTestimonials();
    } catch (error) {
      console.error("Save testimonial error:", error);
      alert("Failed to save testimonial. Please check console.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        setLoading(true);
        await adminService.deleteTestimonial(id);
        await fetchTestimonials();
      } catch (error) {
        console.error("Delete testimonial error:", error);
        alert("Failed to delete testimonial.");
      } finally {
        setLoading(false);
      }
    }
  };

  const openCreateForm = () => {
    setEditingTestimonial({
      quote: '',
      author: '',
      role: '',
      company: '',
      order: testimonials.length + 1
    });
    setIsFormOpen(true);
  };

  const openEditForm = (item: Testimonial) => {
    setEditingTestimonial(item);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white px-8 py-5 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="font-serif text-lg font-bold text-[#081A33]">Client Testimonials</h2>
          <p className="text-xs text-slate-500">Edit or add feedback featured on the Home & About sections.</p>
        </div>
        <div className="flex gap-3">
          {testimonials.length === 0 && (
            <button
              onClick={handleBootstrapTestimonials}
              disabled={submitting}
              className="px-4 py-2 text-slate-600 hover:text-[#2368D6] bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw size={14} className={submitting ? "animate-spin" : ""} />
              Load Defaults
            </button>
          )}
          <button
            onClick={openCreateForm}
            className="bg-[#2368D6] hover:opacity-90 text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer"
          >
            <Plus size={14} /> Add Testimonial
          </button>
        </div>
      </div>

      {loading && testimonials.length === 0 ? (
        <div className="py-24 bg-white rounded-2xl border border-slate-100 shadow-sm flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-[#2368D6] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-widest font-bold text-slate-400">
                  <th className="px-8 py-4 w-12">Order</th>
                  <th className="px-8 py-4">Quote</th>
                  <th className="px-8 py-4">Author</th>
                  <th className="px-8 py-4">Reference</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {testimonials.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors align-top">
                    <td className="px-8 py-5 font-mono text-slate-400 font-medium text-sm">
                      {item.order}
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-slate-700 text-sm italic max-w-lg leading-relaxed">
                        "{item.quote}"
                      </p>
                    </td>
                    <td className="px-8 py-5">
                      <div className="font-bold text-[#081A33] text-sm">{item.author}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{item.role}</div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-xs font-bold text-[#2368D6] uppercase tracking-wider">{item.company}</div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditForm(item)}
                          className="p-2 text-slate-400 hover:text-[#2368D6] hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id!)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50/50 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {testimonials.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-slate-400 italic text-sm">
                      No testimonials found. Click "Add Testimonial" or "Load Defaults" to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {isFormOpen && editingTestimonial && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 sm:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-[#081A33]/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <form onSubmit={handleSave} className="flex flex-col h-full">
                <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-serif text-xl font-bold text-[#081A33]">
                    {editingTestimonial.id ? 'Edit Testimonial' : 'Create Testimonial'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="text-slate-400 hover:text-[#081A33] transition-colors cursor-pointer"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-grow overflow-y-auto p-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Quote</label>
                    <textarea
                      name="quote"
                      defaultValue={editingTestimonial.quote}
                      required
                      rows={4}
                      maxLength={1500}
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#2368D6] transition-all text-sm leading-relaxed"
                      placeholder="The testimonial review quote..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Author Name</label>
                      <input
                        name="author"
                        defaultValue={editingTestimonial.author}
                        required
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#2368D6] transition-all text-sm"
                        placeholder="e.g. Jane Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Display Order</label>
                      <input
                        name="order"
                        type="number"
                        defaultValue={editingTestimonial.order}
                        required
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#2368D6] transition-all text-sm font-mono"
                        placeholder="e.g. 1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Job Title / Role</label>
                      <input
                        name="role"
                        defaultValue={editingTestimonial.role}
                        required
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#2368D6] transition-all text-sm"
                        placeholder="e.g. CEO"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Company Name</label>
                      <input
                        name="company"
                        defaultValue={editingTestimonial.company}
                        required
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#2368D6] transition-all text-sm"
                        placeholder="e.g. OrbitSol Ltd"
                      />
                    </div>
                  </div>
                </div>

                <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-3 text-slate-400 hover:text-slate-600 font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#2368D6] hover:opacity-90 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {submitting ? 'Saving...' : 'Save Testimonial'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
