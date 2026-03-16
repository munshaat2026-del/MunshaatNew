"use client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { comingSoonSchema } from "@/app/server/coming_soon/validators";
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
import {
  ComingSoonCreateInput,
  ComingSoonGetPayload,
  ComingSoonUpdateInput,
} from "@/types";
import { useRouter } from "next/navigation";
import BasicInfo from "./BasicInfo";
import MediaSection from "./MediaSection";
import FormActions from "./FormActions";

type ComingSoonFormValues = z.infer<typeof comingSoonSchema>;

interface Props {
  comingSoon: ComingSoonGetPayload;
  action: (
    id: string,
    data: ComingSoonUpdateInput,
  ) => Promise<{ success: boolean; message: string; status: number }>;
}
function CreateTenderForm({ action, comingSoon }: Props) {
  const methods = useForm<ComingSoonFormValues>({
    resolver: zodResolver(comingSoonSchema),
    defaultValues: {
      ...comingSoon,
      estimated_date: comingSoon.estimated_date
        ? new Date(comingSoon.estimated_date)
        : new Date(),
    },
  });
  const {
    handleSubmit,
  } = methods;

  const router = useRouter();
  const onSubmit: SubmitHandler<ComingSoonFormValues> = async (data) => {
    try {
      const result = await action(comingSoon.id, data);
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
        router.replace("/admin/dashboard/coming-soon");
        return;
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error In Creating The Coming Soon");
    }
  };

  return (
    <FormProvider {...methods}>
      <Card className="w-[97%] mx-auto h-full pt-5">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">
            Edit Coming Soon Details
          </CardTitle>
          <CardDescription className="border-b-2 border-b-gray-900 w-full">
            Fill out the required fields below to Edit Coming Soon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/*  Name, Description, */}
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

export default CreateTenderForm;
