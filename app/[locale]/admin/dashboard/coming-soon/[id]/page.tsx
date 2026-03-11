import { updateComingSoonAction } from "../(actions)/editComingSoon";
import { notFound } from "next/navigation";
import EditForm from "@/components/comingSoon/editComponents/EditForm";
import { getComingSoonById } from "@/app/server/coming_soon/services";

async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const comingSoon = (await getComingSoonById(id)); 
  console.log("comingSoon: ",comingSoon);
  
  
  if (!comingSoon || !comingSoon.data) {
    notFound();
  }

  return (
    <EditForm
      comingSoon={comingSoon.data}
      action={updateComingSoonAction}
    />
  );
}

export default Page;
