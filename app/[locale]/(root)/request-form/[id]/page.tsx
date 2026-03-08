import React from "react";
import { submitRequestAction } from "../(actions)/submitRequestAction";
import SubmitForm from "@/components/form-request/SubmitForm";
import { Locale } from "@/types";
import { getRealEstatesByIdPartially } from "@/app/server/real_estates/services";
import { getParkingByIdPartially } from "@/app/server/parkings/services";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string; locale: Locale }>;
}

async function page({ params }: Props) {
  const { id, locale } = await params;

  const [realEstateData, parkingData] = await Promise.all([
    getRealEstatesByIdPartially(id),
    getParkingByIdPartially(id),
  ]);
  if (!realEstateData.data && !parkingData.data) {
    notFound();
  }

  return (
    <div className="my-28 w-full">
      <SubmitForm
        locale={locale}
        action={submitRequestAction}
        parkingId={parkingData.data ? id : undefined}
        realEstateId={realEstateData.data ? id : undefined}
        parkingData={parkingData.data ? parkingData.data : undefined}
        realEstateData={realEstateData.data ? realEstateData.data : undefined}
      />
    </div>
  );
}

export default page;
