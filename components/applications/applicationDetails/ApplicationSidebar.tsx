"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Briefcase, Download, FileText, Mail, Phone, ClipboardCopy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button1 } from "@/components/ui/Button1";

export default function ApplicationSidebar({ application }: { application: any }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const handleDownload = async (url: string, fileName: string) => {
    if (!url) return;
    
    setIsDownloading(true);
    const toastId = toast.loading("Preparing document for download...");

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Download failed");
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      // Use the candidate name for the filename
      link.download = `${fileName.replace(/\s+/g, "_")}_CV.pdf`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(blobUrl);
      toast.success("Download started successfully", { id: toastId });
    } catch (error) {
      toast.error("Could not download the file. Please try opening it in a new tab.", { id: toastId });
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
      <div className="relative h-40 bg-slate-100">
        {application.careers?.image ? (
          <Image src={application.careers.image} alt="Job" fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <Briefcase size={40} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-6">
          <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
            {application.careers?.position_en || "General Position"}
          </span>
        </div>
      </div>

      <div className="py-8 px-4 md:px-8">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Primary Document</h3>
        {application.cv ? (
          <Button1
            onClick={() => handleDownload(application.cv, application.full_name)}
            disabled={isDownloading}
            className="flex items-center justify-center gap-3 w-full bg-[#0c479a] hover:bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-lg group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            )}
            {isDownloading ? "Processing..." : "Download CV"}
          </Button1>
        ) : (
          <div className="flex items-center gap-3 w-full bg-slate-50 text-slate-400 py-4 rounded-2xl font-bold justify-center border border-dashed border-slate-200">
            <FileText className="w-5 h-5" /> No CV Uploaded
          </div>
        )}

        <div className="mt-10 space-y-3">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Contact Channels</h3>
          <ContactRow icon={<Mail size={14}/>} value={application.email} onCopy={() => copy(application.email, "Email")} />
          <ContactRow icon={<Phone size={14}/>} value={application.phone_number} onCopy={() => copy(application.phone_number, "Phone")} />
        </div>
      </div>
    </div>
  );
}

function ContactRow({ icon, value, onCopy }: any) {
  return (
    <div className="group flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="p-2 bg-white rounded-xl text-slate-400 shadow-sm">{icon}</div>
        <span className="text-xs font-bold text-slate-700 truncate">{value || "---"}</span>
      </div>
      {value && (
        <button onClick={onCopy} className="p-2 text-slate-300 hover:text-[#0c479a] transition-colors">
          <ClipboardCopy size={14} />
        </button>
      )}
    </div>
  );
}