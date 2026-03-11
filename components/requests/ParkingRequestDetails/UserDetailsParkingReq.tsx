"use client";
import React, { useState } from "react";
import {
  User,
  BadgeDollarSign,
  Copy,
  PhoneCall,
  Send,
  CheckCircle2,
  ImageIcon,
  Download,
  Loader2,
  FileText,
  Eye,
} from "lucide-react";
import { type ParkingsRequestsGetPayloadOnly } from "@/types/index";

function UserDetailsParkingReq({
  requestDetails,
}: {
  requestDetails: ParkingsRequestsGetPayloadOnly;
}) {
    const primaryColor = "#0c479a";

  const request = requestDetails;
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  const copyToClipboard = (text: string | undefined, field: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getFileNameFromUrl = (url?: string, fallback = "file") => {
    if (!url) return `${fallback}`;
    try {
      const pathname = new URL(url).pathname;
      const name = pathname.split("/").pop();
      return name || fallback;
    } catch {
      return fallback;
    }
  };

  const downloadImage = async (url?: string, suggestedName?: string) => {
    if (!url) return;
    const filename = getFileNameFromUrl(url, suggestedName || "image");
    setDownloading(filename);
    try {
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error("Network response was not ok");
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      // fallback: open in new tab (user can save manually) — kept as fallback only
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="lg:col-span-5 space-y-6">
      {/* USER DETAILS */}
      <section className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600">
            <User className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 leading-tight">
              {request.name}
            </h3>
            <p className="text-sm text-slate-500 font-medium">
              Applicant Profile
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Email */}
          <div className="group">
            <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1.5 block">
              Email Address
            </label>
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-800 font-semibold truncate mr-2">
                {request.email || "-"}
              </span>
              <button
                onClick={() => copyToClipboard(request.email!, "email")}
                className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-[#2383c9]"
                aria-label="Copy email"
              >
                {copiedField === "email" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Phone */}
          <div className="group">
            <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1.5 block">
              Phone Number
            </label>
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-800 font-semibold">
                {request.phone_number}
              </span>
              <button
                onClick={() => copyToClipboard(request.phone_number, "phone")}
                className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-[#2383c9]"
                aria-label="Copy phone"
              >
                {copiedField === "phone" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-8">
          <a
            href={`mailto:${request.email}`}
            className="flex items-center justify-center gap-2 py-4 text-sm md:text-base bg-[#2383c9] text-white rounded-2xl hover:scale-105 duration-500 font-bold hover:bg-[#1a669d]"
          >
            <Send className="w-4 h-4" /> Send Email
          </a>

          <a
            href={`tel:${request.phone_number}`}
            className="flex items-center justify-center gap-2 py-4 text-sm md:text-base bg-emerald-600 text-white hover:scale-105 duration-500 rounded-2xl font-bold hover:bg-emerald-700"
          >
            <PhoneCall className="w-4 h-4" /> Call Now
          </a>
        </div>
      </section>

      {/* DOCUMENT IMAGES (no full-screen view, download only) */}
   <section className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm overflow-hidden relative">
      {/* Aesthetic Background Detail */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10 opacity-50" />

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
            <FileText className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight ">
              Asset <span style={{ color: primaryColor }}>Registry</span> Documents
            </h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase ">Verification Materials</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1  gap-8">
        {[
          { label: "Identity Image", src: request.identity_image, type: "identity" },
          { label: "License Image", src: request.license_image, type: "license" }
        ].map((doc, idx) => (
          <div key={idx} className="">
            <p className="text-[11px] font-black text-slate-500  mb-3  ml-1">
              {doc.label}
            </p>
            
            <div className="relative rounded-2xl overflow-hidden border border-slate-200  transition-all duration-500 hover:border-[#0c479a]/30 group-hover:shadow-xl group-hover:shadow-[#0c479a]/5">
              
              {/* Image Container */}
              <div className="relative h-64 w-full flex items-center  justify-center p-4">
                <img
                  src={doc.src}
                  alt={doc.label}
                  className="w-full h-full object-contain drop-shadow-md transition-transform duration-700 hover:scale-105"
                  draggable={false}
                />
                
                {/* Visual Overlay on Hover */}
                <div className="absolute inset-0 bg-[#0c479a]/0 hover:bg-[#0c479a]/5 transition-colors duration-500" />
              </div>

              {/* Action Bar */}
              <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => downloadImage(doc.src, `${request.name || "applicant"}-${doc.type}`)}
                  disabled={downloading === getFileNameFromUrl(doc.src)}
                  /* bg-[#2383c9] text-white rounded-2xl hover:scale-105 duration-500 font-bold hover:bg-[#1a669d] */
                  className="flex-1 flex items-center justify-center gap-2  py-3 text-[13px]  uppercase tracking-widest rounded-lg bg-[#2383c9] text-white  hover:scale-[1.02] duration-500 font-bold hover:bg-[#1a669d] disabled:bg-slate-300 transition-all  shadow-sm active:scale-[0.98]"
                >
                  {downloading === getFileNameFromUrl(doc.src) ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </>
                  )}
                </button>
                
                {/* Secondary View Button */}
                <button 
                  onClick={() => window.open(doc.src, '_blank')}
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                  title="View Full Size"
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

      {/* REQUEST META */}
      <section className="bg-slate-900 rounded-[2rem] p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 bg-white/10 rounded-xl">
            <BadgeDollarSign className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Pricing Plan
            </p>
            <p className="text-xl font-black capitalize text-blue-400">
              {request.plan}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm py-2 border-b border-white/10">
            <span className="text-slate-400">Request Date</span>
            <span className="font-bold text-white">
              {new Date(request.created_at!).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm py-2">
            <span className="text-slate-400">Time Received</span>
            <span className="font-bold text-white">
              {new Date(request.created_at!).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserDetailsParkingReq;