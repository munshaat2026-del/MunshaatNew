"use client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { RealEstateSchema } from "@/app/server/real_estates/validators";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";
import { RealEstateCreateInput, RealEstateWithImages } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BasicInfo from "./BasicInfo";
import SpecsAndStatus from "./SpecsAndStatus";
import MediaSection from "./MediaSection";
import FormActions from "./FormActions";
import React from "react";

type RealEstatesFormValues = z.infer<typeof RealEstateSchema>;

interface Props {
    realEstateImages:{id?:string,image_url:string |null}[] |null
  realEstate: RealEstateWithImages;
  action: (
    id: string,
    data: RealEstateCreateInput,
    images: { id: string; image_url: string }[] |null,
  ) => Promise<{ success: boolean; message: string; status: number }>;
}
function EditRealEstatesForm({ action, realEstate,realEstateImages }: Props) {

    const cleanedImages = realEstateImages!.map(img => ({
  id: img.id,
  image_url: img.image_url ?? undefined, 
}));
  const methods = useForm<RealEstatesFormValues>({
    resolver: zodResolver(RealEstateSchema),
    defaultValues: {
      real_estates_images: cleanedImages??[],
      name_en: realEstate.name_en ?? "",
      name_ar: realEstate.name_ar ?? "",
      description_en:realEstate.description_en??"",
      description_ar:realEstate.description_ar??"",
      address_en:realEstate.address_en??"",
      address_ar:realEstate.address_ar??"",
      location_link:realEstate.location_link??"",
      real_estates_type:realEstate.real_estates_type??"office",
      price:realEstate.price??0,
      price_period:realEstate.price_period??"monthly",
      floor_number:realEstate.floor_number??0,
      size_sqm:realEstate.size_sqm??0,
      slug:realEstate.slug??"",
      is_available:realEstate.is_available??false,
      features:realEstate.features??[],
      cover_image:realEstate.cover_image,
    },
  });

  const {
    handleSubmit,
    watch,
  } = methods;

  const [images, setImages] = useState<{ id?:string,image_url: string |null}[]|null>(realEstateImages);
  const watchedRealEstatesImages = watch("real_estates_images");
  React.useEffect(() => {
    setImages(watchedRealEstatesImages ?? []);
  }, [watchedRealEstatesImages]);
  const router = useRouter();
  const onSubmit: SubmitHandler<RealEstatesFormValues> = async (data) => {
      const normalizedImages: { id: string; image_url: string }[] =
    images?.map(img => ({
      id: img.id ?? "",                    
      image_url: img.image_url ?? "",      
    })) ?? [];
    try {
      const { real_estates_images, ...payload } = data;
      const result = await action(
        realEstate.id,
        payload as RealEstateCreateInput,
        normalizedImages,
      );

      if (result.status === 401) {
        toast.error(result.message);
        router.push("/login");
        return;
      } else if (result.status === 403) {
        toast.error(result.message);
        router.push("/");
        return;
      } else if (result.status === 201) {
        toast.success(result.message);
        router.push("/admin/dashboard/real-estates");
        return;
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error In Creating The Real Estates");
    }
  };

  return (
    <FormProvider {...methods}>
      <Card className="w-[97%] mx-auto h-full pt-5">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">
            Edit Real Estate Details
          </CardTitle>
          <CardDescription className="border-b-2 border-b-gray-900 w-full">
            Fill out the required fields below to edit the Real Estate.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
             {/* Real Estate Type, Name, Description, Address, Location, Floor, Size, Price */}
            <BasicInfo />
            {/* Price Period, Features, Is Available */}
            <SpecsAndStatus />
             {/*Cover Image, Gallery */}
            <MediaSection />
            {/*Buttons */}
            <FormActions />
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
}

export default EditRealEstatesForm;
