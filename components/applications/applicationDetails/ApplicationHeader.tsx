import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ApplicationHeader({ isShown, onMarkAsShown, loading }: any) {
  const router = useRouter();
  
  return (
    <nav className="sticky top-0 z-20 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex flex-row items-center justify-between gap-2">
        
        {/* Back Button: Hidden text on very small screens, or kept compact */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors font-bold text-[10px] md:text-sm group whitespace-nowrap"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="hidden xs:inline-block">BACK TO LIST</span>
          <span className="xs:hidden">BACK</span>
        </button>

        <div className="flex items-center gap-2">
          {!isShown ? (
            <button
              disabled={loading}
              onClick={onMarkAsShown}
              className="bg-slate-900 hover:bg-[#0c479a] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-sm text-[10px] md:text-xs font-black uppercase tracking-widest transition-all shadow-sm active:scale-95 disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? "..." : "Mark as Reviewed"}
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-sm text-[9px] md:text-[10px] font-black tracking-widest border border-emerald-100 uppercase">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="inline-block">Reviewed</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}