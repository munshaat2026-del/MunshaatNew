import { notFound } from "next/navigation";
import { getParkingRequestById } from "@/app/server/parkingsRequests/services";
import RequestDetailsClient from "@/components/requests/ParkingRequestDetails/ParkingRequestDetails"


interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const result = await getParkingRequestById(id);
  if (!result || !result.data) {
    notFound();
  }

  const request = result.data;
  
  

  return (
    <div className="p-6">
      <RequestDetailsClient requestDetails={request } />     
    </div>
  );
}
