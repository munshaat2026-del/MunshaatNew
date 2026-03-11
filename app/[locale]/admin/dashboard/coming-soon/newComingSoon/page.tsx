import CreateForm from '@/components/comingSoon/createComponents/CreateForm'
import {addComingSoonAction} from "../(actions)/addNewComingSoon"
function page() {
  return (
    <div className='w-full' >
      <CreateForm action={addComingSoonAction}/>
    </div>
  )
}

export default page