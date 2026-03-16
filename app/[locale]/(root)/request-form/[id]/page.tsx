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

  const realEstateData = await getRealEstatesByIdPartially(id)


  if (!realEstateData.data) {
    notFound();
  }

  return (
    <div className="my-28 w-full">
      <SubmitForm
        locale={locale}
        action={submitRequestAction}
        realEstateId={id}
        realEstateData={realEstateData.data}
      />
    </div>
  );
}

export default page;
