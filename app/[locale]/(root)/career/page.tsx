"use client";
import React from 'react';
import { 
  Briefcase, 
  Clock, 
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link'; // استيراد Link

const JOBS_DATA = [
  {
    id: "1", // يفضل أن يكون نصاً لسهولة التعامل مع الروابط
    position: "Facility Manager",
    description: "Responsible for overseeing the operational maintenance and safety protocols of industrial complexes.",
    requirements: ["5+ Years Experience", "NEBOSH Certified", "Leadership Skills"],
    experience: "Senior Level",
    role: "Full Time",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "2",
    position: "Logistics Coordinator",
    description: "Manage and optimize supply chain routes and warehouse storage efficiency.",
    requirements: ["BSc in Supply Chain", "Expert in SAP", "Analytical Thinking"],
    experience: "Mid Level",
    role: "Full Time",
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "3",
    position: "Security Supervisor",
    description: "Ensure 24/7 asset protection and lead the on-site security personnel team.",
    requirements: ["Military Background", "First Aid Training", "Crisis Management"],
    experience: "3+ Years",
    role: "Part Time",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
  }
];

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* 1. Header Section */}
      <section className="pt-32 pb-20 px-6 border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-[#0c479a]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0c479a]">Join Our Team</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            Careers <span className="italic text-slate-300">@ Munshaat</span>
          </h1>
          <p className="max-w-xl text-slate-500 font-medium text-lg">
            Build the future of industrial infrastructure with us. We are looking for precision, dedication, and expertise.
          </p>
        </div>
      </section>

      {/* 2. Jobs Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {JOBS_DATA.map((job) => (
            /* تغليف الكارد بالكامل بـ Link */
            <Link 
              key={job.id} 
              href={`/career/${job.id}`} // تأكد أن هذا المسار يطابق بنية الملفات عندك
              className="group relative bg-white border border-slate-200 hover:border-black transition-all duration-500 overflow-hidden block"
            >
              {/* Job Image Container */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img 
                  src={job.image} 
                  alt={job.position}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-[9px] font-black uppercase tracking-widest">
                  {job.role}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#0c479a] text-[10px] font-black uppercase tracking-widest italic">
                    <Briefcase size={12} />
                    {job.experience}
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter leading-none group-hover:text-[#0c479a] transition-colors">
                    {job.position}
                  </h3>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed font-medium line-clamp-2">
                  {job.description}
                </p>

                {/* Requirements Array */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {job.requirements.map((req, i) => (
                    <span key={i} className="text-[9px] font-bold uppercase bg-slate-50 border border-slate-100 px-2 py-1 text-slate-400">
                      {req}
                    </span>
                  ))}
                </div>

                {/* Footer Action */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  {/* تحويل الـ button إلى div لأن الكارد أصلاً Link (لتجنب مشاكل Nested Links) */}
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                    View Details <ArrowUpRight size={14} />
                  </div>
                  <div className="flex items-center gap-1 text-slate-300 text-[9px] font-bold uppercase italic">
                    <Clock size={10} /> {job.role}
                  </div>
                </div>
              </div>

              {/* Decorative Accent Line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#0c479a] group-hover:w-full transition-all duration-700"></div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Footer Section */}
      <footer className="py-20 bg-black text-white text-center px-6">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-4">Don't see a fit?</p>
        <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-8">Send your CV for future openings</h4>
        <button className="border border-white/20 px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          General Application
        </button>
      </footer>

    </div>
  );
}