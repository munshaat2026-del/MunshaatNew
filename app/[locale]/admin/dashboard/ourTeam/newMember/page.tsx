import { createMemberyAction } from "../(actions)/addNewMember";
import AddMemberForm from "@/components/ourTeam/createComponents/AddMemberForm";
async function page() {
  

  return (
   <div className="w-full">
   <AddMemberForm  action={createMemberyAction}/>
   </div>
  );
}

export default page;
