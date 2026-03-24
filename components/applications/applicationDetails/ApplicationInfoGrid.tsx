import { Calendar, Hash, MapPin, GraduationCap, User, Globe, FileText } from "lucide-react";
import React from "react";

export default function ApplicationInfoGrid({ application }: { application: any }) {
  const formatDate = (date: any) => 
    date ? new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : "Not Specified";

  const deletionDate = new Date(application.applied_at);
deletionDate.setDate(deletionDate.getDate() + 45);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 py-10 px-4 lg:px-10">
      {/* Header Info */}
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12 pb-10 border-b border-slate-100">
  {/* 🆔 Left Side: Identity & Status */}
  <div className="space-y-4">
    <div className="flex flex-wrap items-center gap-4">
      <h1 className="text-2xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase">
        {application.full_name}
      </h1>
      {/* Visual Status Badge - Industrial Style */}
      <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] self-center">
        Active
      </span>
    </div>

    <div className="flex items-center gap-6">
      <p className="text-slate-400 font-bold text-[11px] uppercase tracking-widest flex items-center gap-2">
        <span className="w-2 h-2 bg-[#0c479a]" /> {/* Small industrial accent */}
        Candidate ID:{" "}
        <span className="text-slate-900 font-black">
          {application.id?.substring(0, 8).toUpperCase()}
        </span>
      </p>
    </div>
  </div>

  {/* 🗓️ Right Side: Process Timeline */}
  <div className="grid grid-cols-2 md:flex md:flex-col gap-6 md:gap-4 md:items-end border-t md:border-t-0 pt-6 md:pt-0 border-slate-50">
    
    {/* Application Date - Clean Metadata */}
    <div className="md:text-right group">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 group-hover:text-slate-600 transition-colors">
        Applied Date
      </p>
      <p className="text-sm font-black text-slate-900 font-mono">
        {formatDate(application.applied_at)}
      </p>
    </div>

    {/* Deletion Date - Styled as a "Warning/Expiration" */}
    <div className="md:text-right group">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 group-hover:text-slate-600 transition-colors">
        Deletion Date
      </p>
      <div className="flex items-center  gap-2">
         {/* Subtle warning dot */}
        <p className="text-sm font-black text-red-600 font-mono">
          {formatDate(deletionDate)}
        </p>
      </div>
    </div>

  </div>
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        {/* PERSONAL SECTION */}
        <div className="space-y-8">
          <SectionLabel label="Personal Identification" />
          <InfoItem icon={<User />} label="Nationality" value={application.nationality} />
          <InfoItem icon={<Hash />} label="National Number" value={application.national_number} />
          <InfoItem icon={<Calendar />} label="Date of Birth" value={formatDate(application.date_of_birth)} />
          <InfoItem icon={<Globe />} label="Place of Birth" value={application.place_of_birth} />
        </div>

        {/* STATUS & EDUCATION SECTION */}
        <div className="space-y-8">
          <SectionLabel label="Professional Status" />
          <InfoItem icon={<GraduationCap />} label="Academic Major" value={application.major} />
          <InfoItem icon={<FileText />} label="Marital Status" value={application.marital_status} />
          <InfoItem icon={<MapPin />} label="City" value={application.city} />
          <InfoItem icon={<MapPin />} label="Full Address" value={application.address} />
        </div>
      </div>

      {/* CV Preview Section */}
      <div className="mt-16 bg-slate-50 rounded-3xl border border-slate-200 py-10 px-3 lg:px-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 border border-slate-100">
          <FileText className="w-8 h-8 text-[#0c479a]" />
        </div>
        <h4 className="text-slate-900 font-black uppercase tracking-widest text-sm mb-3">Verification required</h4>
        <p className="text-slate-500 text-xs font-bold max-w-sm leading-relaxed mb-8">
          For full security compliance, verify the candidate&apos;s credentials by reviewing the original document uploaded to our secure servers.
        </p>
        {application.cv && (
          <a href={application.cv} target="_blank" className="text-[#0c479a] font-black text-xs uppercase tracking-widest hover:text-slate-900 transition-colors flex items-center gap-2">
            Open File in Viewer →
          </a>
        )}
      </div>
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return <h4 className="text-[11px] font-black text-[#0c479a] uppercase tracking-[0.4em] pb-2 border-b-2 border-[#0c479a]/10">{label}</h4>;
}

function InfoItem({ icon, label, value }: any) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-[#0c479a]/5 group-hover:text-[#0c479a] transition-all">
        {React.cloneElement(icon, { size: 18 })}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">{label}</p>
        <p className="text-sm font-bold text-slate-800 uppercase">{value || "Not Provided"}</p>
      </div>
    </div>
  );
}