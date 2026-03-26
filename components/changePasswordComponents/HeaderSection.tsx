import { ShieldCheck } from "lucide-react";
import React from "react";

function HeaderSection() {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-2">
        <ShieldCheck size={16} className="text-[#0c479a]" />
        <p className="text-[10px] font-black uppercase  text-slate-400">
          Security Settings
        </p>
      </div>
      <h1 className="text-3xl font-black uppercase   tracking-tight text-slate-900">
        Update <span className="text-[#0c479a]">Password.</span>
      </h1>
    </div>
  );
}

export default HeaderSection;
