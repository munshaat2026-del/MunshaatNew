import CreateRealEstatesForm from '@/components/real-estates/createComponents/NewRealEstatesForm'
import React from 'react'
import {addRealEstatesAction} from "../(actions)/addRealEstates"
function page() {
  return (
    <div className='w-full' >
      <CreateRealEstatesForm action={addRealEstatesAction}/>
    </div>
  )
}

export default page