import { type RequestsGetPayloadParking } from "@/types/index";
import Image from "next/image";
import {
  MapPin,
  ExternalLink,
  Car,
  Map as MapIcon,
} from "lucide-react";
function ParkingDetails({
  requestDetails,
}: {
  requestDetails: RequestsGetPayloadParking;
}) {
  const request = requestDetails;

  return (
    <div className="lg:col-span-7 h-fit">
      <section className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm h-full flex flex-col">
        {/* 1. Header Section */}
        <div className="py-8 px-4 md:px-8 ">
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-50 text-[#2383c9] text-[8px] md:text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border border-blue-100">
                  Parking Asset
                </span>
              </div>
              <h2 className=" text-xl md:text-3xl font-black text-slate-900 leading-tight">
                {request.parkings?.name_en}
              </h2>
             
            </div>

            <div className="text-right bg-slate-50  py-2 md:py-4 px-4 rounded-2xl border border-slate-100 ">
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-tighter mb-1">
                Price
              </p>
              <p className="text-2xl font-black text-[#397a34]">
                $
                {request.plan === "monthly"
                  ? request.parkings?.price_monthly
                  : request.parkings?.price_yearly}
                <span className="text-xs font-bold text-slate-400">
                  /{request.plan === "monthly" ? "mo" : "yr"}
                </span>
              </p>
            </div>
          </div>
           <p className="text-slate-500 flex items-center text-xs md:text-base gap-1.5 mt-2 font-medium">
                <MapPin className="w-4 h-4 text-red-500" />
                {request.parkings?.address_en}
              </p>
        </div>

        {/* 2. Image Section */}
        <div className="px-8">
          <div className="relative h-64 w-full rounded-[2rem] overflow-hidden bg-slate-100 border border-slate-200 group">
            {request.parkings?.image ? (
              <Image
                src={request.parkings.image}
                alt={request.parkings.name_en || "Parking"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-contain hover:scale-125 transition-transform duration-700"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                <Car className="w-16 h-16 mb-2" />
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
            <div>
              <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-3 flex items-center gap-2">
                <div className="w-1 h-3 bg-[#2383c9] rounded-full" />
                Description & Details
              </h4>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-50">
                {request.parkings?.description_en ||
                  "No description provided for this parking spot."}
              </p>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-dashed border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Car className="w-5 h-5 text-slate-600" />
                </div>
                <span className="text-sm font-bold text-slate-700">
                  Total Capacity
                </span>
              </div>
              <span className="text-base md:text-lg font-black text-slate-900">
                {request.parkings?.total_spots || 0} Spots
              </span>
            </div>
          </div>

          {/* 4. GOOGLE MAPS ACTION */}
          {request.parkings?.location_link && (
            <div >
              <a
                href={request.parkings.location_link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-2 pr-3 md:pr-6 bg-white hover:scale-105 duration-500 rounded-2xl transition-all  shadow-sm hover:shadow-xl border border-slate-200 hover:border-[#2383c9]"
              >
                <div className="bg-slate-50 group-hover:bg-[#2383c9] p-4 rounded-xl transition-colors">
                  <MapIcon className="w-6 h-6 text-[#2383c9] group-hover:text-gray-800" />
                </div>
                <div className="flex-1">
                  <p className="text-[8px] md:text-[10px] font-black text-slate-400 group-hover:text-slate-600 uppercase tracking-widest leading-none mb-1.5 transition-colors">
                    Maps Integration
                  </p>
                  <p className="text-xs  md:text-base font-black text-slate-900 group-hover:text-gray-600 leading-none transition-colors">
                    Open in Google Maps
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600 uppercase hidden sm:block transition-colors">
                    Redirect
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:text-slate-400 flex items-center justify-center transition-all">
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-slate-700" />
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

export default ParkingDetails;
