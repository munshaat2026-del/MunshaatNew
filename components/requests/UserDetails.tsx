"use client";
import React, { useState } from "react";
import {
  User,
  BadgeDollarSign,
  Copy,
  PhoneCall,
  Send,
  CheckCircle2,
} from "lucide-react";
import { type RequestsGetPayloadOnly } from "@/types/index";

function UserDetails({
  requestDetails,
}: {
  requestDetails: RequestsGetPayloadOnly;
}) {
  const request = requestDetails;
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="lg:col-span-5 space-y-6">
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
          {/* Email Field */}
          <div className="group">
            <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1.5 block">
              Email Address
            </label>
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100 group-hover:border-slate-300 transition-all">
              <span className="text-slate-800 font-semibold truncate mr-2">
                {request.email}
              </span>
              <button
                onClick={() => copyToClipboard(request.email!, "email")}
                className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-[#2383c9] transition-colors shadow-xs"
              >
                {copiedField === "email" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Phone Field */}
          <div className="group">
            <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1.5 block">
              Phone Number
            </label>
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100 group-hover:border-slate-300 transition-all">
              <span className="text-slate-800 font-semibold">
                {request.phone_number}
              </span>
              <button
                onClick={() => copyToClipboard(request.phone_number, "phone")}
                className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-[#2383c9] transition-colors shadow-xs"
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
            className="flex items-center justify-center gap-2 py-4 text-sm md:text-base bg-[#2383c9] text-white rounded-2xl hover:scale-105 duration-500 font-bold hover:bg-[#1a669d] transition-all shadow-md shadow-blue-100"
          >
            <Send className="w-4 h-4" /> Send Email
          </a>
          <a
            href={`tel:${request.phone_number}`}
            className="flex items-center justify-center gap-2 py-4 text-sm md:text-base bg-emerald-600 text-white hover:scale-105 duration-500 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100"
          >
            <PhoneCall className="w-4 h-4" /> Call Now
          </a>
        </div>
      </section>

      {/* Request Meta Card */}
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

export default UserDetails;
