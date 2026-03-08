import { ShieldCheck } from 'lucide-react'
import React from 'react'


function HeaderSection({success}:{success:boolean}) {
  return (
    <div>
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck
                size={16}
                className={success ? "text-emerald-500" : "text-[#0c479a]"}
              />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                Account Recovery
              </p>
            </div>
            <h1 className="text-3xl font-black uppercase italic tracking-tight text-slate-900">
              {success ? "Link " : "Reset "}
              <span className="text-[#0c479a]">
                {success ? "Sent." : "Password."}
              </span>
            </h1>
          </div>
    </div>
  )
}

export default HeaderSection