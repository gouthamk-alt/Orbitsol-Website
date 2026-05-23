import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
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

export const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await adminService.getTestimonials();
        if (data && data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials(DEFAULT_TESTIMONIALS);
        }
      } catch (error) {
        console.error("Failed to load testimonials:", error);
        setTestimonials(DEFAULT_TESTIMONIALS);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="py-24 bg-white flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-[#2368D6] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 bg-white font-sans border-t border-slate-100 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <p className="text-[#2368D6] font-bold tracking-widest uppercase text-[10px] mb-4">Client Success Stories</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#081A33] tracking-tight">
            Trusted by industry leaders worldwide
          </h2>
        </div>

        <div className="relative min-h-[320px] md:min-h-[260px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-center max-w-3xl mx-auto px-4 md:px-12"
            >
              <div className="flex justify-center text-[#2368D6]/15 mb-8">
                <Quote size={56} className="transform rotate-180" />
              </div>
              <blockquote className="font-serif text-lg md:text-2xl text-[#081A33] leading-relaxed mb-8 italic">
                "{current.quote}"
              </blockquote>
              <div className="pt-4">
                <cite className="not-italic block font-bold text-base text-[#081A33] font-sans">
                  {current.author}
                </cite>
                <span className="text-slate-500 text-sm font-sans">
                  {current.role} &mdash; <strong className="font-semibold text-[#2368D6]">{current.company}</strong>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel controls */}
        {testimonials.length > 1 && (
          <div className="flex justify-center items-center gap-6 mt-12 relative z-10">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-slate-200 text-slate-400 hover:text-[#2368D6] hover:border-[#2368D6] flex items-center justify-center transition-all bg-white shadow-sm cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'bg-[#2368D6] w-6' : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to testimonial slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-slate-200 text-slate-400 hover:text-[#2368D6] hover:border-[#2368D6] flex items-center justify-center transition-all bg-white shadow-sm cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
