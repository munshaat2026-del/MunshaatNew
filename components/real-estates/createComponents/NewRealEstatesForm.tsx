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
import { RealEstateCreateInput } from "@/types";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import BasicInfo from "./BasicInfo";
import SpecsAndStatus from "./SpecsAndStatus";
import MediaSection from "./MediaSection";
import FormActions from "./FormActions";
import React from "react";

type RealEstatesFormValues = z.infer<typeof RealEstateSchema>;

interface Props {
  action: (
    data: RealEstateCreateInput,
    images: { image_url: string }[],
  ) => Promise<{ success: boolean; message: string; status: number }>;
}
function CreateRealEstatesForm({ action }: Props) {
  const methods = useForm<RealEstatesFormValues>({
    resolver: zodResolver(RealEstateSchema),
    defaultValues: { real_estates_images: [] },
  });

  const {
    handleSubmit,
    watch,
  } = methods;

  const [images, setImages] = useState<{ image_url: string }[]>([]);
  const watchedRealEstatesImages = watch("real_estates_images");
  React.useEffect(() => {
    setImages(watchedRealEstatesImages ?? []);
  }, [watchedRealEstatesImages]);
  const router = useRouter();
  const onSubmit: SubmitHandler<RealEstatesFormValues> = async (data) => {
    try {
      const { real_estates_images, ...payload } = data;
      const result = await action(payload as RealEstateCreateInput, images);

      if (result.status === 401) {
        toast.error(result.message);
        router.replace("/login");
        return;
      } else if (result.status === 403) {
        toast.error(result.message);
        router.replace("/");
        return;
      } else if (result.status === 201) {
        toast.success(result.message);
        router.replace("/admin/dashboard/real-estates");
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
            New Real Estates Details
          </CardTitle>
          <CardDescription className="border-b-2 border-b-gray-900 w-full">
            Fill out the required fields below to create a new Real Estates.
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

export default CreateRealEstatesForm;
