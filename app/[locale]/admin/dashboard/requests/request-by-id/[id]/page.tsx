import { getRequestById } from "@/app/server/requests/services";
import { notFound } from "next/navigation";
import {RequestsGetPayloadRealEstate} from "@/types/index"
import RealEstateRequestDetails from "@/components/requests/realEstateDetails/RealEstateRequestDetails";

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
  
  

  return (
    <div className="p-6">
      {/*<RequestDetailsClient requestDetails={request } />*/}
      <RealEstateRequestDetails requestDetails={request as RequestsGetPayloadRealEstate } />
     
    </div>
  );
}
