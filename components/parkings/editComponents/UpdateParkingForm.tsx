"use client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { ParkingSchema } from "@/app/server/parkings/validators";
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
import { ParkingsCreateInput, ParkingsGetPayload } from "@/types";
import { useRouter } from "next/navigation";
import BasicInfo from "./BasicInfo";
import MediaSection from "./MediaSection";
import FormActions from "./FormActions";

type ParkingFormValues = z.infer<typeof ParkingSchema>;

interface Props {
  parking:ParkingsGetPayload
  action: (
    id:string,
    data: ParkingsCreateInput,
  ) => Promise<{ success: boolean; message: string; status: number }>;
}
function CreateRealEstatesForm({ action,parking }: Props) {
  const methods = useForm<ParkingFormValues>({
    resolver: zodResolver(ParkingSchema),
    defaultValues:parking
    
  });
  const {
    handleSubmit,
    formState:{errors}
  } = methods;

  console.log("errors: ",errors);
  

  const router = useRouter();
  const onSubmit: SubmitHandler<ParkingFormValues> = async (data) => {
    try {
      const result = await action(parking.id,data);
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
        router.replace("/admin/dashboard/parkings");
        return;
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error In Updating The Parking");
    }
  };

  return (
    <FormProvider {...methods}>
      <Card className="w-[97%] mx-auto h-full pt-5">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">
            Edit Parking Details
          </CardTitle>
          <CardDescription className="border-b-2 border-b-gray-900 w-full">
            Fill out the required fields below to Edit The Parking.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
            
          >
            {/*  Name, Description, Address, Location, Total Spots, Price */}
            <BasicInfo />
          
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
