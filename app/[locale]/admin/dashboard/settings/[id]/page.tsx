import { getSettingById } from "@/app/server/settings/services";
import { editSettingAction } from "../(fetch)/editSetting";
import EditSettingForm from "@/components/settings/editSettingForm";
import { notFound } from "next/navigation";

async function Page(prop: { params: Promise<{ id: string }> }) {
  const { id } = await prop.params;

  const result = await getSettingById(id);

  if (!result ) {
    notFound();
  }

  const setting = result;

  return (
    <main>
      <EditSettingForm setting={setting} action={editSettingAction} />
    </main>
  );
}

export default Page;
