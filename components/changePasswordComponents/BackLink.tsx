import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackLink() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-[#0c479a] uppercase tracking-widest transition-all italic">
      <ArrowLeft size={14} />
      Back to Dashboard
    </Link>
  );
}