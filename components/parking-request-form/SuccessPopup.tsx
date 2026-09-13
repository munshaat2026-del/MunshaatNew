"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface SuccessPopupProps {
  isOpen: boolean;
  isArabic: boolean;
  onConfirm: () => void;
}

export default function SuccessPopup({
  isOpen,
  isArabic,
  onConfirm,
}: SuccessPopupProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-300">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_30px_80px_rgba(15,23,42,0.2)] md:p-10">
          {/* Accent Line */}
          <div
            className="absolute top-0 left-0 h-1 w-full"
            style={{ backgroundColor: "#0c479a" }}
          />

          {/* Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#0c479a]/10">
            <CheckCircle2 className="h-11 w-11 text-[#0c479a]" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
            {isArabic
              ? "تم تقديم الطلب بنجاح"
              : "Request Submitted Successfully"}
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-sm text-sm font-medium leading-7 text-slate-500">
            {isArabic
              ? "تم استلام طلبكم بنجاح، وسيتم التواصل معكم في أقرب وقت ممكن."
              : "Your request has been received successfully. We will contact you as soon as possible."}
          </p>

          {/* Action Button */}
          <button
            type="button"
            onClick={onConfirm}
            className="mt-8 w-full rounded-xl px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: "#0c479a" }}
          >
            {isArabic ? "حسنًا" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
