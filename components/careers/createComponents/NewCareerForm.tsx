"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { careersSchema } from "@/app/server/careers/validators";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import BasicInfo from "./BasicInfo";
import MediaSection from "./MediaSection";
import FormActions from "./FormActions";

type CareerFormValues = z.infer<typeof careersSchema>;

interface Props {
  action: (
    data: CareerFormValues,
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

export default function CreateCareerForm({ action }: Props) {
  const router = useRouter();
  const methods = useForm<CareerFormValues>({
    resolver: zodResolver(careersSchema),
    defaultValues: {
      requirements_ar: [],
      requirements_en: [],
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting,errors },
  } = methods;

  console.log("errors: ",errors);
  

  const onSubmit = async (data: CareerFormValues) => {
    try {
      const result = await action(data);
      if (result.status === 401) {
        toast.error(result.message);
        router.replace("/login");
        return;
      }

      if (result.status === 403) {
        toast.error(result.message);
        router.replace("/");
        return;
      }
      if (result.status === 201) {
        toast.success(result.message);
        router.replace("/admin/dashboard/careers");
        return;
      }
      toast.error(result.message);
    } catch (err) {
      toast.error("Error In Creating The Career");
    }
  };

  return (
    <FormProvider {...methods}>
      <main className="w-full max-w-6xl px-4 sm:px-6 md:px-8">
        <h1 className="border-b-2 border-gray-800 text-3xl font-semibold text-gray-800 mb-4 pb-1">
          Add New Career
        </h1>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">
              New Career Details
            </CardTitle>
            <CardDescription>
              Fill out the required fields below to create a new career.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full "
              aria-busy={isSubmitting}
            >
              <div className="flex flex-col w-full gap-6">
                {/* position, description, role, experience, requirements  */}
                <BasicInfo />
                {/* image */}
                <MediaSection />
              </div>
              {/* Buttons */}
              <FormActions />
            </form>
          </CardContent>
        </Card>
      </main>
    </FormProvider>
  );
}
