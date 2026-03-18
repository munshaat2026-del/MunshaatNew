"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  X,
  Filter,
  Maximize2,
  Banknote,
  Layers,
  RotateCcw,
  Search,
  AlertCircle,
} from "lucide-react";
import { Locale } from "@/types";
import { Button1 } from "@/components/ui/Button1";

export default function OfficeFilterSidebar({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [minSize, setMinSize] = useState<string>(searchParams?.get("minSize") ?? "");
  const [maxSize, setMaxSize] = useState<string>(searchParams?.get("maxSize") ?? "");
  const [minPrice, setMinPrice] = useState<string>(searchParams?.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState<string>(searchParams?.get("maxPrice") ?? "");
  const [floor, setFloor] = useState<string>(searchParams?.get("floor") ?? "");
  const [error, setError] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState(false);

  useEffect(() => {
    setMinSize(searchParams?.get("minSize") ?? "");
    setMaxSize(searchParams?.get("maxSize") ?? "");
    setMinPrice(searchParams?.get("minPrice") ?? "");
    setMaxPrice(searchParams?.get("maxPrice") ?? "");
    setFloor(searchParams?.get("floor") ?? "");
  }, [searchParams]);

  const updateParams = () => {
    setError(null);

    // Validation Logic
    if (maxSize && minSize && Number(maxSize) < Number(minSize)) {
      setError(isArabic ? "أقصى مساحة لا يمكن أن تكون أقل من الحد الأدنى." : "Maximum size cannot be less than minimum.");
      return;
    }
    if (maxPrice && minPrice && Number(maxPrice) < Number(minPrice)) {
      setError(isArabic ? "أقصى سعر لا يمكن أن يكون أقل من الحد الأدنى." : "Maximum price cannot be less than minimum.");
      return;
    }

    const params = new URLSearchParams(Array.from(searchParams ?? []) as [string, string][]);
    const filters = { minSize, maxSize, minPrice, maxPrice, floor };

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value); 
    });

    if (params.has("page")) params.set("page", "1");
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`);
    setOpenMobile(false);
  };

  const clearAll = () => {
    setError(null);
    router.push(pathname);
    setOpenMobile(false);
  };

  return (
    <>
      {/* Mobile Trigger */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpenMobile(true)}
          className="bg-[#0c479a] text-white shadow-xl p-4 rounded-full flex items-center justify-center transition-transform active:scale-95"
        >
          <Filter size={20} />
        </button>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 z-60 w-full sm:w-72 bg-white transform transition-transform duration-300 ease-in-out border-r border-slate-200
          ${openMobile ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:relative lg:z-0 lg:w-full`}
      >
        <div className="flex flex-col h-full font-sans">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Filter size={14} className="text-[#0c479a]" />
              {isArabic ? "خيارات البحث" : "Search Filters"}
            </h2>
            <button onClick={() => setOpenMobile(false)} className="lg:hidden p-1 text-slate-400">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Validation Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 text-red-600 rounded text-[11px] font-medium animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            {/* Size Section */}
            <section>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3 block">
                {isArabic ? "مساحة الطابق (م²)" : "Area Size (sqm)"}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <Maximize2 className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                  <input
                    type="number"
                    placeholder={isArabic ? "الحد الأدنى" : "Min"}
                    value={minSize}
                    onChange={(e) => setMinSize(e.target.value)}
                    className="w-full border border-slate-200 p-2 pl-8 text-sm rounded focus:ring-1 focus:ring-[#0c479a] outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <Maximize2 className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                  <input
                    type="number"
                    placeholder={isArabic ? "الحد الأقصى" : "Max"}
                    value={maxSize}
                    onChange={(e) => setMaxSize(e.target.value)}
                    className="w-full border border-slate-200 p-2 pl-8 text-sm rounded focus:ring-1 focus:ring-[#0c479a] outline-none transition-all"
                  />
                </div>
              </div>
            </section>

            {/* Price Section */}
            <section>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3 block">
                {isArabic ? "نطاق السعر" : "Price Range"}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <Banknote className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                  <input
                    type="number"
                    placeholder={isArabic ? "الحد الأدنى" : "Min"}
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full border border-slate-200 p-2 pl-8 text-sm rounded focus:ring-1 focus:ring-[#0c479a] outline-none"
                  />
                </div>
                <div className="relative">
                  <Banknote className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                  <input
                    type="number"
                    placeholder={isArabic ? "الحد الأقصى" : "Max"}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full border border-slate-200 p-2 pl-8 text-sm rounded focus:ring-1 focus:ring-[#0c479a] outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Floor Section */}
            <section>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3 block">
                {isArabic ? "رقم الطابق" : "Floor Level"}
              </label>
              <div className="relative">
                <Layers className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                <input
                  type="number"
                  placeholder={isArabic ? "أي طابق" : "Any floor"}
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className="w-full border border-slate-200 p-2 pl-8 text-sm rounded focus:ring-1 focus:ring-[#0c479a] outline-none"
                />
              </div>
            </section>
          </div>

          {/* Action Footer */}
          <div className="p-4 border-t border-slate-100 bg-white space-y-2">
            <Button1
              onClick={updateParams}
              className="w-full py-2.5 text-xs font-bold rounded flex items-center justify-center gap-2"
            >
              <Search size={14} />
              {isArabic ? "تطبيق الفلاتر" : "Apply Filters"}
            </Button1>
            <button
              onClick={clearAll}
              className="w-full py-2 text-[11px] font-medium text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center gap-1"
            >
              <RotateCcw size={12} />
              {isArabic ? "مسح جميع الفلاتر" : "Clear all filters"}
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {openMobile && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-55 lg:hidden backdrop-blur-[2px]"
          onClick={() => setOpenMobile(false)}
        />
      )}
    </>
  );
}