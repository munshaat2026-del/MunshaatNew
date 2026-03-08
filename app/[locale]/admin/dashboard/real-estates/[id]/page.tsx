import { getRealEstateImages, getRealEstatesById } from "@/app/server/real_estates/services";
import { updateRealEstatesAction } from "../(actions)/editRealEstates";
import { notFound } from "next/navigation";
import EditRealEstatesForm from "@/components/real-estates/editComponents/UpdateRealEstatesForm";

async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const realEstate = (await getRealEstatesById(id)); 
  const realEstateImages=  (await getRealEstateImages(id)).data
  console.log("realEstate: ",realEstate);
  
  if (!realEstate || !realEstate.data) {
    notFound();
  }

  return (
    <EditRealEstatesForm
      realEstateImages={realEstateImages}
      realEstate={realEstate.data}
      action={updateRealEstatesAction}
    />
  );
}

export default Page;
