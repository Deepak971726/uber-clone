import React, { useEffect, useState } from 'react'

const LocationSearchPanel = ({isPickupLocation, setPickup, setDestination ,locationSearchData,setPanelOpen ,setVehiclePanel}) => {
  const [locations, setLocations] = useState(['gfghvghv'])
  // const location = [
  //   '24B, Near keee coaafee, new delhi technology',
  //   '24B, Near keee coaafee, new delhi technology',
  //   '24B, Near keee coaafee, new delhi technology'
  // ]
  
   useEffect(()=>{
    setLocations(locationSearchData)
   },[locationSearchData])
  
  const onClickHandler =(item)=>{
    if(isPickupLocation){
      setPickup(item)
    }
    else{
      setDestination(item)
    }
    // setVehiclePanel(true)
    // setPanelOpen(false)
    // console.log("cldsfdf")
  }
  return (
    <div>
      {/* Location serach panel */}
      {locations?.map((item,index)=>{
        return <div value={item} onClick={()=>onClickHandler(item)} key={index} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                <h2 value={item} className='bg-[#eee] flex items-center justify-center h-8 w-12 rounded-full' ><i className="ri-map-pin-fill"></i></h2>
                <h4 value={item} className='text-base font-medium'>{item}</h4>
              </div>
      })}
      
       
       
    </div>
  )
}

export default LocationSearchPanel
