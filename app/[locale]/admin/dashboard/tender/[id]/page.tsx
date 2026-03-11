import { updateTenderAction } from "../(actions)/editTenderAction";
import { notFound } from "next/navigation";
import EditTenderForm from "@/components/tenders/editTenderComponent/EditTenderForm";
import { getTenderById } from "@/app/server/tenders/services";

async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const tender = (await getTenderById(id)); 
  console.log("tender: ",tender);
  
  
  if (!tender || !tender.data) {
    notFound();
  }

  return (
    <EditTenderForm
      tender={tender.data}
      action={updateTenderAction}
    />
  );
}

export default Page;
