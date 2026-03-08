import { Search, Filter, ChevronDown } from "lucide-react";

interface OfficesSearchBarProps {
  primaryColor: string;
}

export default function OfficesSearchBar({ primaryColor }: OfficesSearchBarProps) {
  return (
    <section className="sticky top-0 z-40 bg-white border-b border-slate-100 py-6 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center">
        <div className="relative flex-1 w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search by building or location..."
            className="w-full bg-slate-50 pl-12 pr-4 py-4 rounded-lg outline-none focus:ring-2 transition-all border border-slate-100 font-medium"
            style={{ boxShadow: "0 0 0 0 transparent" }}
          />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex items-center gap-2 px-6 py-4 bg-slate-50 border border-slate-100 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-slate-100">
            <Filter size={18} />
            Filter
            <ChevronDown size={14} />
          </button>

          <button
            className="flex-1 md:flex-none text-white px-10 py-4 rounded-lg font-black text-sm uppercase tracking-widest shadow-lg"
            style={{ backgroundColor: primaryColor }}
          >
            Find Space
          </button>
        </div>
      </div>
    </section>
  );
}