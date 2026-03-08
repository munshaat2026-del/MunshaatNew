"use client";
import { OurTeamUpdateInput, OurTeamGetPayload } from "@/types";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import z from "zod";
import { toast } from "sonner";
import { ourteamSchema } from "@/app/server/ourTeam/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import BasicInfo from "./BasicInfo";
import MediaSection from "./MediaSection";
import FormActions from "./FormActions";

interface Props {
  member: OurTeamGetPayload | null;
  action: (
    memberId: string,
    data: OurTeamUpdateInput,
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

type MembersFormValues = z.infer<typeof ourteamSchema>;

export default function EditMemberForm({ action, member }: Props) {
  const methods = useForm<MembersFormValues>({
    resolver: zodResolver(ourteamSchema),
    defaultValues: {
      name_en: member?.name_en ?? "",
      name_ar: member?.name_ar ?? "",
      description_en: member?.description_en ?? "",
      description_ar: member?.description_ar ?? "",
      main: member?.main ?? false,
      position_en: member?.position_en ?? "",
      position_ar: member?.position_ar ?? "",
      image: member?.image ?? "",
    },
  });

  const { handleSubmit } = methods;

  const router = useRouter();
  const onSubmit: SubmitHandler<MembersFormValues> = async (data) => {
    try {
      const result = await action(member?.id ?? "", data);
      if (result.status === 401) {
        toast.error(result.message);
        router.push("/login");
      } else if (result.status === 403) {
        toast.error(result.message);
        router.push("/");
      } else if (result.status === 201) {
        toast.success(result.message);
        router.push("/admin/dashboard/ourTeam");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error updating the member");
    }
  };

  return (
    <FormProvider {...methods}>
      <main className="w-full max-w-6xl  px-4 sm:px-6 md:px-8 mb-7">
        <div className="flex flex-col justify-start items-start border-b border-gray-500 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Edit Member</h1>
          {member?.id && (
            <p className="text-xs md:text-sm text-gray-600">ID: {member.id}</p>
          )}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full"
        >
          <Card>
            <CardHeader>
              <CardTitle>Edit Member Details</CardTitle>
              <CardDescription className="border-b-2 border-gray-800">
                Fill out the required fields below to update the member.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-6">
              {/* Name, Description, Position */}
              <BasicInfo />
              {/* Image */}
              <MediaSection />
              {/* Buttons */}
              <FormActions />
            </CardContent>
          </Card>
        </form>
      </main>
    </FormProvider>
  );
}
