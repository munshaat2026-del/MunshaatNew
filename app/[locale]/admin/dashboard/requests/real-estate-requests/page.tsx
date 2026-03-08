import Link from "next/link";
import Image from "next/image";
import { getAllRealEstatesWithRequests } from "@/app/server/real_estates/services";
import {
  Building2,
  Warehouse,
  Store,
  LayoutGrid,
  ArrowRight,
} from "lucide-react";

async function RealEstatesRequestsPage() {
  const response = await getAllRealEstatesWithRequests();
  const allRealEstates = response?.data ?? [];
  console.log("allRealEstates: ",allRealEstates);
  

  // Grouping logic
  const sections = [
    {
      title: "Offices",
      type: "office",
      icon: <Building2 className="w-5 h-5" />,
      items: allRealEstates.filter((ele) => ele.real_estates_type === "office"),
    },
    {
      title: "Depots",
      type: "depot",
      icon: <Warehouse className="w-5 h-5" />,
      items: allRealEstates.filter((ele) => ele.real_estates_type === "depot"),
    },
    {
      title: "Stores",
      type: "store",
      icon: <Store className="w-5 h-5" />,
      items: allRealEstates.filter((ele) => ele.real_estates_type === "store"),
    },
  ];

  if (allRealEstates.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="p-6 bg-gray-50 rounded-full mb-4">
          <LayoutGrid className="w-12 h-12 text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          No properties found
        </h2>
        <p className="text-gray-500 mt-2 max-w-xs">
          Once you add real estate listings, they will appear here grouped by
          category.
        </p>
        <Link
          href="/admin/dashboard/real-estates/newRealEstates"
          className="mt-6 bg-[#397a34] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#2d5f29] transition-all"
        >
          Add New Property
        </Link>
      </main>
    );
  }

  return (
    <main className="p-4 lg:p-8 max-w-400 mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl">
          Real Estate Applications
        </h1>
        <p className="text-gray-500 mt-2">
          Browse requests organized by property type.
        </p>
      </header>

      <div className="space-y-16">
        {sections.map(
          (section) =>
            section.items.length > 0 && (
              <section
                key={section.type}
                className="animate-in fade-in mb-7 slide-in-from-bottom-4 duration-700"
              >
                <div className="flex items-center justify-center mb-6 border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg text-gray-700">
                      {section.icon}
                    </div>
                    <h2 className="text-xl  font-bold text-gray-800">
                      {section.title}
                    </h2>
                    <span className="text-sm font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                      {section.items.length} Properties
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
                  {section.items.map((realEstate) => (
                    <Link
                      key={realEstate.id}
                      href={`/admin/dashboard/requests/real-estate-requests/${realEstate.id}`}
                      className="group relative flex flex-col items-center"
                    >
                      {/* Circle Image Container */}
                      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 border-2 border-transparent group-hover:border-[#397a34] transition-all duration-300">
                        <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-sm border group-hover:shadow-xl transition-shadow">
                          <Image
                            src={
                              realEstate.cover_image ?? "/placeholder-home.png"
                            }
                            alt={realEstate.name_en!}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        {/* Floating Count Badge */}
                        <div className="absolute top-3 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#2383c9] text-white text-xs font-bold shadow-lg ring-4 ring-white">
                          {realEstate.requests.length}
                        </div>
                      </div>

                      <div className="mt-4 text-center space-y-1">
                        <p className="text-sm font-bold text-gray-900 group-hover:text-[#2383c9] transition-colors truncate max-w-37.5">
                          {realEstate.name_en}
                        </p>
                        <div className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-wider font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          View Details <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ),
        )}
      </div>
    </main>
  );
}

export default RealEstatesRequestsPage;
