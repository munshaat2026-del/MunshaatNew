import React from "react";
import { submitRequestAction } from "../(actions)/submitRequestAction";
import SubmitForm from "@/components/form-request/SubmitForm";
import { Locale } from "@/types";
import { getRealEstatesByIdPartially } from "@/app/server/real_estates/services";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/constants/metadata";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  return generatePageMetadata("requestForm", (await params).locale);
}

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
