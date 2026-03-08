import { getRequestById } from "@/app/server/requests/services";
import { notFound } from "next/navigation";
import {RequestsGetPayloadParking,RequestsGetPayloadRealEstate} from "@/types/index"
import RealEstateRequestDetails from "@/components/requests/realEstateDetails/RealEstateRequestDetails";
import ParkingRequestDetails from "@/components/requests/ParkingRequestDetails/ParkingRequestDetails";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const result = await getRequestById(id);
  if (!result || !result.data) {
    notFound();
  }

  const request = result.data;
  const isRealEstate= request.request_type==="real_estates"
  

  return (
    <div className="p-6">
      {/*<RequestDetailsClient requestDetails={request } />*/}
      {isRealEstate && <RealEstateRequestDetails requestDetails={request as RequestsGetPayloadRealEstate } />}
      {!isRealEstate && <ParkingRequestDetails requestDetails={request as RequestsGetPayloadParking } />}
    </div>
  );
}
