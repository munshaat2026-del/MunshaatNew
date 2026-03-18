import { type RequestsGetPayloadRealEstate } from "@/types/index"; 
import Image from "next/image";
import {
  MapPin,
  ExternalLink,
  Home,
  Map as MapIcon,
  Layers,
  Maximize,
  CheckCircle2,
} from "lucide-react";

function RealEstateDetails({
  requestDetails,
}: {
  requestDetails: RequestsGetPayloadRealEstate; 
}) {
  const property = requestDetails.real_estates;

  return (
    <div className="lg:col-span-7 h-full">
      <section className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm h-full flex flex-col">
        {/* 1. Header Section */}
        <div className="py-8 px-4 md:px-8">
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-emerald-50 text-emerald-600 text-[8px] md:text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border border-emerald-100">
                  {property?.real_estates_type || "Real Estate"} Asset
                </span>
              </div>
              <h2 className="text-xl md:text-3xl font-black text-slate-900 leading-tight">
                {property?.name_en}
              </h2>
            </div>

            <div className="text-right bg-slate-50 py-2 md:py-4 px-4 rounded-2xl border border-slate-100 min-w-25 md:min-w-35">
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-tighter mb-1">
                Price
              </p>
              <p className="text-base md:text-2xl font-black text-[#397a34]">
                ${property?.price?.toLocaleString()}
                <span className="text-xs font-bold text-slate-400 block md:inline">
                  {property?.price_period ? ` / ${property.price_period}` : ""}
                </span>
              </p>
            </div>
            
          </div>
           <p className="text-slate-500 flex items-center text-xs md:text-base gap-1.5 mt-2 font-medium">
                <MapPin className="w-4 h-4 text-red-500" />
                {property?.address_en}
              </p>
        </div>

        {/* 2. Image Section */}
        <div className="px-8">
          <div className="relative h-64 w-full rounded-[2rem] overflow-hidden bg-slate-100 border border-slate-200 group">
            {property?.cover_image ? (
              <Image
                src={property.cover_image}
                alt={property.name_en || "Property"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                <Home className="w-16 h-16 mb-2" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  No Image Available
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 3. Content Details */}
        <div className="py-8 px-4 md:px-8 flex-1 flex flex-col">
          <div className="space-y-6 mb-8">
            {/* Description */}
            <div>
              <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-3 flex items-center gap-2">
                <div className="w-1 h-3 bg-[#2383c9] rounded-full" />
                Description
              </h4>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-50">
                {property?.description_en || "No description provided."}
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Maximize className="w-4 h-4 text-[#2383c9]" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase">Size</span>
                </div>
                <span className="text-sm font-black text-slate-900">{property?.size_sqm} sqm</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Layers className="w-4 h-4 text-[#2383c9]" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase">Floor</span>
                </div>
                <span className="text-sm font-black text-slate-900">{property?.floor_number ?? "G"}</span>
              </div>
            </div>

            {/* Features Chips */}
            {property?.features_en && property.features_en.length > 0 && (
              <div>
               
                <h4 className="text-[10px] flex flex-row gap-1.5 uppercase font-black text-slate-400 tracking-widest mb-3">
                   <div className="w-1 h-3 bg-emerald-500 rounded-full" /> Key Features</h4>
                <div className="flex flex-wrap gap-2">
                  {property.features_en.map((feature: string, idx: number) => (
                    <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-bold border border-slate-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 4. GOOGLE MAPS ACTION */}
          {property?.location_link && (
            <div className="mt-auto">
              <a
                href={property.location_link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-2 pr-4 md:pr-6 bg-white hover:bg-[#2383c9] rounded-2xl transition-all duration-300 shadow-sm hover:shadow-xl border border-slate-200 hover:border-[#2383c9]"
              >
                <div className="bg-slate-50 group-hover:bg-white/20 p-4 rounded-xl transition-colors">
                  <MapIcon className="w-6 h-6 text-[#2383c9] group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[8px] md:text-[10px] font-black text-slate-400 group-hover:text-white/80 uppercase tracking-widest leading-none mb-1.5 transition-colors">
                    Maps Integration
                  </p>
                  <p className="text-xs md:text-base font-black text-slate-900 group-hover:text-white leading-none transition-colors">
                    Open in Google Maps
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-white/70 uppercase hidden sm:block transition-colors">
                    Redirect
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-white/20 flex items-center justify-center transition-all">
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white" />
                  </div>
                </div>
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default RealEstateDetails;