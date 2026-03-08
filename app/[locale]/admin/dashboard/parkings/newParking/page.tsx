import CreateParkingForm from '@/components/parkings/createComponents/CreateParkingForm'
import React from 'react'
import {addParkingAction} from "../(actions)/addParking"
function page() {
  return (
    <div className='w-full' >
      <CreateParkingForm action={addParkingAction}/>
    </div>
  )
}

export default page