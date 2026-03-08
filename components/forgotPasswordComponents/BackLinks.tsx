import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackLink() {
  return (
   <div className="text-center mt-10 pt-6 border-t border-slate-100">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-[#0c479a] uppercase tracking-widest transition-all italic"
            >
              <ArrowLeft size={14} />
              Return to Login
            </Link>
          </div>
  );
}