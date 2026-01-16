import React from 'react'

const LocationSearchPanel = ({setPanelOpen ,setVehiclePanel}) => {
  
  const locations = [
    '24B, Near keee coaafee, new delhi technology',
    '24B, Near keee coaafee, new delhi technology',
    '24B, Near keee coaafee, new delhi technology'
  ]
  
  const onClickHandler =()=>{
    setVehiclePanel(true)
    setPanelOpen(false)
    // console.log("cldsfdf")
  }
  return (
    <div>
      {/* Location serach panel */}
      {locations.map((item,index)=>{
        return <div onClick={onClickHandler} key={index} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                <h2 className='bg-[#eee] flex items-center justify-center h-8 w-12 rounded-full' ><i className="ri-map-pin-fill"></i></h2>
                <h4 className='text-base font-medium'>{item}</h4>
              </div>
      })}
      
       
       
    </div>
  )
}

export default LocationSearchPanel
