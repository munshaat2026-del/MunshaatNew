import Link from "next/link";
import Image from "next/image";
import {  getAllParkingsWithRequest } from "@/app/server/parkings/services";

async function page() {
  const response = await getAllParkingsWithRequest();
  const allParkings = response?.data ?? [];

  return (
    <main className="ml:0 md:ml-2.5 lg:ml-5 mt-2">
      <header className="mb-4">
        <h1 className="ml-2 text-xl text-gray-800 lg:text-3xl font-semibold">
          All Parkings
        </h1>
      </header>

      {/* EMPTY STATE */}
      {allParkings.length === 0 ? (
        <div className="mt-20 flex flex-col items-center justify-center text-center text-gray-500">
          <div className="text-lg font-medium">No parkings available</div>
          <p className="mt-2 text-sm">
            Once you add parkings, they will appear here.
          </p>

          {/* Optional CTA */}
          <Link
            href="/admin/dashboard/parkings/newParking"
            className="mt-6 inline-flex items-center rounded-md bg-[#397a34] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
          >
            Add New Parking
          </Link>
        </div>
      ) : (
        <div className="space-y-12 mt-8">
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 px-4 lg:px-0 mt-5 lg:grid-cols-5 gap-6">
              {allParkings.map((parking, index) => (
                <Link
                  key={index}
                  href={`/admin/dashboard/requests/parkings-requests/${parking.id}`}
                  className="group flex flex-col items-center  text-center hover:scale-105 transition-transform duration-500 ease-in-out"
                >
                  <div className="w-44 h-44 rounded-full overflow-hidden flex items-center justify-center border shadow-md bg-gray-50 hover:shadow-lg">
                    <Image
                      src={parking.image ?? "DefaultImage"}
                      alt={parking.name_en!}
                      width={50}
                      height={50}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="text-sm text-gray-700 font-medium truncate max-w-36 mt-2">
                    {parking.name_en} 
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-600">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-[#2383c9]/10 text-[#2383c9] font-semibold">
                      {parking.requests.length}
                    </span>
                    <span className="whitespace-nowrap">Requests</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default page;
