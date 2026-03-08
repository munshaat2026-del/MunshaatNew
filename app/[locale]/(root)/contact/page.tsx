import React from 'react';
import { 
  Phone, Mail, MapPin, MessageSquare, 
  Globe, Send, Building2, 
  Linkedin, Twitter, Instagram 
} from 'lucide-react';

export default function ContactUs() {
  const primaryColor = "#0c479a";

  return (
    <div className="min-h-screen mt-20 bg-white text-slate-900 font-sans" dir="ltr">
      
      {/* 1. HEADER - Architectural Style */}
      <header className="py-32 px-6 text-center border-b border-slate-100">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-[#0c479a]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Direct Communication</span>
          </div>
          <h1 className="text-6xl md:text-[8vw] font-black uppercase tracking-tighter text-slate-900 leading-[0.8]">
            LET'S <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #0c479a' }}>CONNECT.</span>
          </h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest max-w-xl mx-auto leading-loose pt-6">
            Institutional-grade support for asset owners and global brands.
          </p>
        </div>
      </header>

      {/* 2. CONTACT GRID */}
      <main className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-slate-100">
          
          {/* LEFT: Technical Info (Sharp Blocks) */}
          <div className="lg:col-span-5 border-r border-slate-100">
            <div className="p-12 space-y-16">
              <div className="space-y-12">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Operational <br /> Headquarters</h2>
                
                <div className="space-y-10">
                  {[
                    { Icon: MapPin, label: "Riyadh Office", val: "KAFD, Tower 4, Riyadh, KSA" },
                    { Icon: Phone, label: "Direct Line", val: "+966 11 234 5678" },
                    { Icon: Mail, label: "Official Inquiry", val: "ops@royalmanage.sa" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-slate-100 group-hover:bg-[#0c479a] group-hover:text-white transition-all duration-500" style={{ color: primaryColor }}>
                        <item.Icon size={18} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="font-black text-[9px] uppercase tracking-[0.3em] text-slate-300 mb-1">{item.label}</h4>
                        <p className="font-black text-sm text-slate-800 uppercase tracking-tight">{item.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Hours Table */}
              <div className="bg-slate-950 p-10 text-white space-y-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0c479a]">Operating Hours</h3>
                <div className="space-y-4">
                  {[
                    { day: "Sun - Thu", time: "08:00 - 18:00" },
                    { day: "Friday", time: "Closed", alert: true },
                    { day: "Saturday", time: "Support Only" }
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{row.day}</span>
                      <span className={`text-[11px] font-black uppercase tracking-widest ${row.alert ? 'text-red-500' : 'text-white'}`}>{row.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Contact Form (Sharp Input Fields) */}
          <div className="lg:col-span-7 p-12 md:p-16 bg-slate-50/30 relative">
            <form className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="group space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 group-focus-within:text-[#0c479a] transition-colors">Full Name</label>
                  <input type="text" placeholder="IDENTITY" className="w-full bg-transparent border-b-2 border-slate-100 py-3 text-sm font-black uppercase tracking-tighter outline-none focus:border-[#0c479a] transition-all placeholder:text-slate-200" />
                </div>
                <div className="group space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 group-focus-within:text-[#0c479a] transition-colors">Company</label>
                  <input type="text" placeholder="ORGANIZATION" className="w-full bg-transparent border-b-2 border-slate-100 py-3 text-sm font-black uppercase tracking-tighter outline-none focus:border-[#0c479a] transition-all placeholder:text-slate-200" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="group space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 group-focus-within:text-[#0c479a] transition-colors">Business Email</label>
                  <input type="email" placeholder="OFFICIAL EMAIL" className="w-full bg-transparent border-b-2 border-slate-100 py-3 text-sm font-black uppercase tracking-tighter outline-none focus:border-[#0c479a] transition-all placeholder:text-slate-200" />
                </div>
                <div className="group space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 group-focus-within:text-[#0c479a] transition-colors">Department</label>
                  <select className="w-full bg-transparent border-b-2 border-slate-100 py-3 text-sm font-black uppercase tracking-tighter outline-none focus:border-[#0c479a] transition-all cursor-pointer appearance-none rounded-none">
                    <option>ASSET MANAGEMENT</option>
                    <option>LEASING INQUIRIES</option>
                    <option>PARKING SERVICES</option>
                  </select>
                </div>
              </div>

              <div className="group space-y-3">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 group-focus-within:text-[#0c479a] transition-colors">Message Protocol</label>
                <textarea rows={4} placeholder="OPERATIONAL ASSISTANCE REQUIRED..." className="w-full bg-transparent border-b-2 border-slate-100 py-3 text-sm font-black uppercase tracking-tighter outline-none focus:border-[#0c479a] transition-all resize-none placeholder:text-slate-200"></textarea>
              </div>

              <button 
                className="w-full py-6 bg-[#0c479a] text-white font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-4 transition-all hover:bg-black group active:scale-[0.99]"
              >
                Submit Protocol <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </main>

      {/* 3. SOCIAL FOOTPRINT */}
      <section className="py-24 border-t border-slate-100 flex flex-col items-center space-y-10">
        <h3 className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-300">Global Connectivity</h3>
        <div className="flex gap-16 text-slate-200">
           {[Linkedin, Twitter, Instagram, Globe].map((Icon, i) => (
             <Icon key={i} size={24} strokeWidth={1.5} className="hover:text-[#0c479a] cursor-pointer transition-colors" />
           ))}
        </div>
      </section>
    </div>
  );
}