import CreateTenderForm from '@/components/tenders/createTenderComponents/CreateTenderForm'
import React from 'react'
import {addTenderAction} from "../(actions)/newTenderAction"
function page() {
  return (
    <div className='w-full' >
      <CreateTenderForm action={addTenderAction}/>
    </div>
  )
}

export default page