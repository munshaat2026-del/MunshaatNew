import React from "react";
import { 
  CheckCircle2, 
  ArrowLeft, 
  Warehouse,
  Briefcase,
  Clock,
  ShieldCheck,
  Plus
} from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// 1. البيانات (Mock Data) - يجب أن تطابق الـ IDs الموجودة في صفحة الكاريرز
const JOBS_DATA_DB: any = {
  "1": {
    position: "Facility Manager",
    description: "Responsible for overseeing the operational maintenance and safety protocols of industrial complexes. You will lead a team of technicians and ensure all infrastructure meets international standards.",
    requirements: ["5+ Years Experience", "NEBOSH Certified", "Leadership Skills", "Fluent in Technical English"],
    experience: "Senior Level",
    role: "Full Time",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    address: "Main Industrial Hub - Sector A"
  },
  "2": {
    position: "Logistics Coordinator",
    description: "Manage and optimize supply chain routes and warehouse storage efficiency. This role requires high analytical skills to reduce overhead costs and improve delivery timelines.",
    requirements: ["BSc in Supply Chain", "Expert in SAP", "Analytical Thinking", "Inventory Management Experience"],
    experience: "Mid Level",
    role: "Full Time",
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&q=80&w=1200",
    address: "North Logistics Center"
  },
  "3": {
    position: "Security Supervisor",
    description: "Ensure 24/7 asset protection and lead the on-site security personnel team. Focus on surveillance systems and rapid response protocols for the entire industrial complex.",
    requirements: ["Military Background", "First Aid Training", "Crisis Management", "CCTV Systems Knowledge"],
    experience: "3+ Years",
    role: "Part Time",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    address: "Industrial Complex - Gate 04"
  }
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const job = JOBS_DATA_DB[id];

  // إذا كان الـ ID غير موجود في البيانات
  if (!job) return notFound();

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#0c479a] selection:text-white">
      


      <main className="max-w-6xl mx-auto px-6 py-20">
        
        {/* 2. Job Header Section */}
        <div className="border-l-[6px] border-[#0c479a] pl-8 mb-16">
          <div className="flex gap-3 mb-6">
            <span className="bg-black text-white text-[9px] font-black uppercase px-3 py-1.5 tracking-widest flex items-center gap-2">
              <Clock size={12} /> {job.role}
            </span>
            <span className="border border-slate-200 text-slate-400 text-[9px] font-black uppercase px-3 py-1.5 tracking-widest flex items-center gap-2">
              <Briefcase size={12} /> {job.experience}
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-slate-900">
            {job.position}
          </h1>
        </div>

        {/* 3. Hero Image */}
        <div className="relative w-full aspect-video md:aspect-[21/8] bg-slate-100 mb-20 overflow-hidden border border-slate-900 shadow-[20px_20px_0px_0px_rgba(241,245,249,1)]">
          <img 
            src={job.image} 
            alt={job.position}
            className="object-cover  transition-all duration-[1.5s]"
          />
        </div>

        {/* 4. Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 border-t border-slate-100 pt-20">
          
          {/* Detailed Info */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* Description */}
            <section className="space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0c479a] flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#0c479a]"></span> 01. Job Description
              </h3>
              <p className="text-2xl md:text-3xl text-slate-800 leading-[1.2] font-black uppercase tracking-tighter italic">
                {job.description}
              </p>
            </section>

            {/* Requirements (Mapping Array) */}
            <section className="space-y-10 bg-slate-900 text-white p-12 md:p-16 relative">
              <div className="absolute top-0 left-10 -translate-y-1/2 w-12 h-12 bg-[#0c479a] flex items-center justify-center">
                <Plus size={24} />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">
                02. Core Requirements
              </h3>
              <div className="grid grid-cols-1 gap-8">
                {job.requirements.map((req: string, index: number) => (
                  <div key={index} className="flex items-start gap-6 group">
                    <span className="text-2xl font-black text-[#0c479a] italic opacity-50 group-hover:opacity-100 transition-opacity">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-lg font-bold uppercase tracking-tight leading-tight border-b border-white/10 pb-4 w-full">
                      {req}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 border-[4px] border-black p-10 bg-white">
              <h4 className="text-2xl font-black uppercase tracking-tighter mb-4 leading-none text-[#0c479a]">
                Apply for <br /> This Position
              </h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-12 leading-relaxed tracking-widest">
                Our HR department will review your profile. Please ensure your CV is up to date.
              </p>
              
              <button className="w-full bg-black text-white py-6 font-black uppercase text-[11px] tracking-[0.3em] hover:bg-[#0c479a] transition-all duration-500 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none">
                Submit Application
              </button>
              
              <div className="mt-8 pt-8 border-t border-slate-100 flex items-center gap-3 text-slate-400">
                 <ShieldCheck size={20} />
                 <span className="text-[9px] font-black uppercase tracking-widest italic">Verified Asset Protection</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="mt-40 border-t border-black py-16 text-center bg-slate-50">
        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400">
          Munshaat Industrial Portfolio 2026
        </span>
      </footer>
    </div>
  );
}