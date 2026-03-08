import { Search } from "lucide-react";

interface RetailCategoriesProps {
  primaryColor: string;
  categories: string[];
}

export default function RetailCategories({ primaryColor, categories }: RetailCategoriesProps) {
  return (
    <section className="py-10 px-6 md:px-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex gap-4 overflow-x-auto w-full pb-4 md:pb-0 no-scrollbar">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest border transition-all whitespace-nowrap ${i === 0 ? `bg-[${primaryColor}] text-white border-[${primaryColor}]` : 'bg-white text-slate-400 border-slate-100 hover:border-[#2383c9]'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input
            type="text"
            placeholder="Search malls or cities..."
            className="w-full bg-slate-50 border border-slate-100 px-6 py-3 rounded-full outline-none focus:ring-2 focus:ring-[#2383c9]/10 font-bold text-sm"
          />
        </div>
      </div>
    </section>
  );
}