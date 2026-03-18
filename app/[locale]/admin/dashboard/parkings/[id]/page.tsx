import { updateParkingAction } from "../(actions)/editParking";
import { notFound } from "next/navigation";
import UpdateParkingForm from "@/components/parkings/editComponents/UpdateParkingForm";
import { getParkingById } from "@/app/server/parkings/services";

async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const parking = (await getParkingById(id)); 
  
  
  if (!parking || !parking.data) {
    notFound();
  }

  return (
    <UpdateParkingForm
      parking={parking.data}
      action={updateParkingAction}
    />
  );
}

export default Page;
