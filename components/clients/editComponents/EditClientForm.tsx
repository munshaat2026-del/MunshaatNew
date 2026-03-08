"use client";

import { ClientsCreateInput,ClientsGetPayload } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { clientsSchema } from "@/app/server/clients/validators";
import z from "zod";
import BasicInfo from "./BasicInfo";
import MediaSection from "./MediaSection";
import FormActions from "./FormActions";

interface Props {
  client: ClientsGetPayload ;
  action: (
    id: string,
    data: ClientsCreateInput,
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

type ClientFormValues = z.infer<typeof clientsSchema>;

export default function EditClientForm({ action, client }: Props) {
  const router = useRouter();
  const methods = useForm<ClientFormValues>({
    resolver: zodResolver(clientsSchema),
    defaultValues: {
      name_en: client?.name_en,
      name_ar: client?.name_ar,
    logo: client?.logo??"",
    },
  });

  const {
    handleSubmit,
  }=methods
  const onSubmit: SubmitHandler<ClientFormValues> = async (data) => {
    try {
      const result = await action(client!.id ?? "", data);
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
        setTimeout(() => {
          router.replace("/admin/dashboard/ourClients");
        }, 500);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Error In Creating The Client");
    }
  };

  return (
    <FormProvider {...methods}>
      <main className="ml-3 xl:ml-7 mb-7 ">
        <div className="flex flex-col justify-start items-start border-b-2 border-gray-800 w-[90vw] md:w-[65vw] mb-7">
          <h1 className=" text-[#050505] text-3xl  font-semibold">
            Edit Client
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full w-full lg:w-[70vw] flex flex-col gap-5 "
        >
          <Card className="w-full h-full pt-5">
            <CardHeader>
              <CardTitle>Edit Client Details</CardTitle>
              <CardDescription>
                Fill out the required fields below to edit the client.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col items-start gap-5 mb-7 ">
              {/* Name */}
              <BasicInfo />
              {/* Logo */}
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
