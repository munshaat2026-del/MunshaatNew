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
import { CareersUpdateInput, CareersGetPayload } from "@/types";
import BasicInfo from "./BasicInfo";
import MediaSection from "./MediaSection";
import FormActions from "./FormActions";


type CareerFormValues = z.infer<typeof careersSchema>;

interface Props {
  career: CareersGetPayload;
  action: (
    data: CareersUpdateInput,
    id: string,
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

export default function EditCareerForm({ action, career }: Props) {
  const router = useRouter();
  const methods = useForm<CareerFormValues>({
    resolver: zodResolver(careersSchema),
    defaultValues: {
      position_en: career.position_en ?? "",
      position_ar: career.position_ar ?? "",
      description_en: career.description_en ?? "",
      description_ar: career.description_ar ?? "",
      experience_en: career.experience_en ?? "",
      experience_ar: career.experience_ar ?? "",
      role_en: career.role_en ?? "",
      role_ar: career.role_ar ?? "",
      requirements_ar: career.requirements_en ?? [],
      requirements_en: career.requirements_ar ?? [],
      slug: career.slug ?? "",
      image: career.image ?? "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: CareerFormValues) => {
    try {
      const result = await action(data, career.id ?? "");
      if (result.status === 401) {
        toast.error(result.message);
        router.push("/login");
        return;
      }
      if (result.status === 403) {
        toast.error(result.message);
        router.push("/");
        return;
      }
      if (result.status === 201) {
        toast.success(result.message);
        router.push("/admin/dashboard/careers");
        return;
      }
      toast.error(result.message);
    } catch (err) {
      toast.error("Error In Creating The Career");
    }
  };

  return (
    <FormProvider {...methods}>
      {" "}
      <main className="w-full max-w-6xl px-4 sm:px-6 md:px-8">
        <h1 className="border-b-2 border-gray-800 text-3xl font-semibold text-[#050505] mb-4 pb-1">
          Edit Career
        </h1>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">
              Edit Career Details
            </CardTitle>
            <CardDescription>
              Fill out the required fields below to Edit the career.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full lg:w-2/3"
              aria-busy={isSubmitting}
            >
              <div className="flex flex-col w-full gap-6">
                {/* position, description, role, experience, requirements  */}
                <BasicInfo />
                {/* Image  */}
                <MediaSection />
              </div>
              {/* Buttons  */}
              <FormActions />
            </form>
          </CardContent>
        </Card>
      </main>
    </FormProvider>
  );
}
