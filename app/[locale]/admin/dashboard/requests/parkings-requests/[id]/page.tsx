import { getAllrequestsByFilters } from "@/app/server/requests/services";
import { deleteRequestAction } from "../../(actions)/deleteRequest";
import { RequestColumns } from "@/components/columns/request-columns";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import { getParkingNameById } from "@/app/server/parkings/services";
import RequestsFilter from "@/components/requests/ApplicationFilter";
import { ApplicationsDataTable } from "@/components/ApplicationsDataTable";
import { notFound } from "next/navigation";

interface Props {
  searchParams: Promise<{
     requestId?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  name: string;
    page?: number;
  }>;
  params: Promise<{ id: string }>;
}

async function Page({ params, searchParams }: Props) {
  const id = (await params).id;
  const searchParamsData = await searchParams;
  const page = Number(searchParamsData.page ?? 1);
  const filters = {
    parkingId: id,
    name: searchParamsData.name ?? null,
    requestId: searchParamsData.requestId ?? null,
    phoneNumber: searchParamsData.phoneNumber ?? null,
    email: searchParamsData.email ?? null,
    
  };

  const parkingResult = await getParkingNameById(id);

  if (!parkingResult || !parkingResult.data) {
    notFound();
  }  
  const parkingDetails = parkingResult.data;
  const filteredData = await getAllrequestsByFilters(page, filters);
  console.log("filteredData: ",filteredData);
  

  return (
    <div className="flex flex-col justify-start items-start ml-5 md:ml-7 w-[88vw] md:w-[68vw] xl:w-[80vw]">
      <h1 className="text-2xl font-semibold mb-4 border-b p-1 w-full">
        Requests On {parkingDetails.name_en}
      </h1>

      <RequestsFilter
        initialName={searchParamsData.name ?? ""}
        initialPhoneNumber={searchParamsData.phoneNumber??""}
        initialEmail={searchParamsData.email??""}
        initialRequestId={searchParamsData.requestId??""}
      />

      <div className="mt-4 mb-4 flex items-center gap-3"></div>

      {filteredData.data.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center text-center">
            <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
            <h3 className="text-gray-600 text-lg font-medium">
              No Applications Found
            </h3>
          </CardContent>
        </Card>
      ) : (
        <ApplicationsDataTable
          columns={RequestColumns}
          data={filteredData.data}
          routeName="request-by-id"
          deleteAction={deleteRequestAction}
          totalPages={filteredData.totalPages}
          parkingId={id}
          name={searchParamsData.name??null}
          requestId={searchParamsData.requestId ?? null}
          email={searchParamsData.email ?? null}
          phoneNumber={searchParamsData.phoneNumber ?? null}
        />
      )}
    </div>
  );
}

export default Page;
