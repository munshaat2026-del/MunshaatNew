
import Link from "next/link";
import {
  ArrowLeft,
} from "lucide-react";
import { type RequestsGetPayloadParking } from "@/types/index";
import ParkingDetails from "./ParkingDetails";
import UserDetails from "../UserDetails";

export default function RequestDetailPage({
  requestDetails,
}: {
  requestDetails: RequestsGetPayloadParking;
}) {
const { parkings, ...requestDetailsOnly } = requestDetails;
  const parkingId= requestDetails.parkings?.id

  return (
    <main className="ml-0 md:ml-2 lg:ml-4 max-w-7xl  min-h-screen">
      {/* Navigation Header */}
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <Link
            href={`/admin/dashboard/requests/parkings-requests/${parkingId}`}
            className="flex items-center text-sm font-bold text-[#2383c9] hover:text-[#1a669d] transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to All Requests
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Request Review
            </h1>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: CONTACT & ACTIONS */}
        <UserDetails requestDetails={requestDetailsOnly} />

        {/* RIGHT: PROPERTY DETAILS */}
        <ParkingDetails requestDetails={requestDetails} />
      </div>
    </main>
  );
}
