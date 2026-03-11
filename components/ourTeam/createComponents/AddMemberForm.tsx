"use client";
import { type OurTeamCreateInput } from "@/types";
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
  action: (
    data: OurTeamCreateInput,
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

type MembersFormValues = z.infer<typeof ourteamSchema>;

export default function AddMemberForm({ action }: Props) {
  const methods = useForm<MembersFormValues>({
    resolver: zodResolver(ourteamSchema),
    defaultValues: { main: false },
  });

  const {
    handleSubmit,
  } = methods;

  const router = useRouter();
  const onSubmit: SubmitHandler<MembersFormValues> = async (data) => {
    try {
      const result = await action(data);
      if (result.status === 401) {
        toast.error(result.message);
        router.replace("/login");
      } else if (result.status === 403) {
        toast.error(result.message);
        router.replace("/");
      } else if (result.status === 201) {
        toast.success(result.message);
        router.replace("/admin/dashboard/ourTeam");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error in creating the member");
    }
  };

  return (
    <FormProvider {...methods}>
      <main className="w-full max-w-7xl  px-4 sm:px-6 md:px-8 mb-7">
        <div className="flex flex-col justify-start items-start border-b border-gray-500 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add New Member</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
          
        >
          <Card className="w-[97%] mx-auto h-full pt-5">
            <CardHeader>
              <CardTitle>New Member Details</CardTitle>
              <CardDescription className="border-b-2 border-gray-800">
                Fill out the required fields below to create a new member.
              </CardDescription>
            </CardHeader>
            <CardContent >
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
