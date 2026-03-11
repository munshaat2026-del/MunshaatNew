"use client";

import React from "react";
import { Phone, Mail, MapPin, Send, Linkedin, Twitter, Instagram } from "lucide-react";
import { useLocale } from "next-intl";
import { aboutdata } from "@/app/data/aboutdata";

export default function ContactSection() {
  const primaryColor = "#0c479a";
  const locale = useLocale() as "en" | "ar";
  const isAr = locale === "ar";

  const data = aboutdata[locale].contact;

  const iconMap: any = {
    address: MapPin,
    phone: Phone,
    email: Mail
  };

  return (
    <section
      className="bg-white text-slate-900 py-24 md:py-32 overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">

        {/* Header */}
        <div className="mb-20 space-y-4">
          <div className="inline-flex items-center gap-2">
            <div className="w-2 h-2 bg-[#0c479a]"></div>

            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
              {data.header.tag}
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 leading-none">
            {data.header.title1}{" "}
            <span className="text-[#0c479a]">
              {data.header.title2}
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-slate-100 shadow-2xl shadow-slate-200/50">

          {/* LEFT */}
          <div className={`lg:col-span-5 border-slate-100 ${isAr ? "lg:border-l" : "lg:border-r"}`}>
            <div className="p-8 md:p-12 space-y-12">

              <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight">
                {data.headquarters.title1} <br />
                {data.headquarters.title2}
              </h3>

              <div className="space-y-8">
                {data.info.map((item, i) => {
                  const Icon = iconMap[item.key];

                  return (
                    <div key={i} className="flex gap-5 group">

                      <div
                        className="w-10 h-10 shrink-0 flex items-center justify-center border border-slate-100 group-hover:bg-[#0c479a] group-hover:text-white transition-all duration-500"
                        style={{ color: primaryColor }}
                      >
                        <Icon size={18} strokeWidth={1.5} />
                      </div>

                      <div>
                        <h4 className="font-black text-[9px] uppercase tracking-[0.3em] text-slate-300 mb-1">
                          {item.label}
                        </h4>

                        <p className="font-black text-sm text-slate-800 uppercase tracking-tight">
                          {item.value}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Hours */}
              <div className="bg-slate-950 p-8 text-white space-y-6">

                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0c479a]">
                  {data.hours.title}
                </h3>

                <div className="space-y-3">
                  {data.hours.rows.map((row, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0"
                    >
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                        {row.day}
                      </span>

                      <span className={`text-[10px] font-black uppercase tracking-widest ${row.alert ? "text-red-500" : "text-white"}`}>
                        {row.time}
                      </span>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="lg:col-span-7 p-8 md:p-16 bg-slate-50/50">

            <form className="space-y-10">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                <div className="group space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
                    {data.form.fullName}
                  </label>

                  <input
                    type="text"
                    placeholder={data.form.placeholders.name}
                    className="w-full bg-transparent border-b border-slate-200 py-3 text-sm font-black uppercase tracking-tighter outline-none focus:border-[#0c479a]"
                  />
                </div>

                <div className="group space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
                    {data.form.company}
                  </label>

                  <input
                    type="text"
                    placeholder={data.form.placeholders.company}
                    className="w-full bg-transparent border-b border-slate-200 py-3 text-sm font-black uppercase tracking-tighter outline-none focus:border-[#0c479a]"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                <div className="group space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
                    {data.form.email}
                  </label>

                  <input
                    type="email"
                    placeholder={data.form.placeholders.email}
                    className="w-full bg-transparent border-b border-slate-200 py-3 text-sm font-black uppercase tracking-tighter outline-none focus:border-[#0c479a]"
                  />
                </div>

                <div className="group space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
                    {data.form.department}
                  </label>

                  <select className="w-full bg-transparent border-b border-slate-200 py-3 text-sm font-black uppercase tracking-tighter outline-none focus:border-[#0c479a]">
                    {data.form.departments.map((dep, i) => (
                      <option key={i}>{dep}</option>
                    ))}
                  </select>
                </div>

              </div>

              <div className="group space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
                  {data.form.message}
                </label>

                <textarea
                  rows={3}
                  className="w-full bg-transparent border-b border-slate-200 py-3 text-sm font-black uppercase tracking-tighter outline-none focus:border-[#0c479a]"
                />
              </div>

              <button className="w-full py-5 bg-[#0c479a] text-white font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-4 hover:bg-black transition">
                {data.form.submit}
                <Send size={14} />
              </button>

            </form>

          </div>
        </div>

        {/* Social */}
        <div className="mt-16 flex justify-between items-center border-t border-slate-50 pt-8">

          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">
            {data.globalPresence}
          </span>

          <div className="flex gap-8 text-slate-300">
            {[Linkedin, Twitter, Instagram].map((Icon, i) => (
              <Icon key={i} size={18} className="hover:text-[#0c479a] cursor-pointer transition-colors" />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}