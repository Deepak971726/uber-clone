import React from 'react'

const VehiclePanel = ({setVehiclePanel, setConfirmRidePanel}) => {
    // const onClickHandler=()=>{
        
    
    return (
        <div>
            <h5 
            onClick={()=>setVehiclePanel(false)} 
            className='absolute top-2 right-58 text-4xl'><i  className="text-gray-400 ri-arrow-down-wide-line"></i></h5>
            <h2 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h2>
            <div onClick={()=>{
                setConfirmRidePanel(true)
                setVehiclePanel(false)
            }} className='flex border-2 border-transparent active:border-black bg-gray-200 rounded-2xl mb-2 w-full p-3 items-center justify-between'>
            <img className='h-18' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8zMDUxZTYwMi0xMGJiLTRlNjUtYjEyMi1lMzk0ZDgwYTljNDcucG5n" alt="" />
            <div className='w-1/2'>
                <h4 className='font-medium text-base'>UberGo <span><i className='ri-user-3-fill'>4</i></span></h4>
                <h5 className='font-medium text-sm'>2 mins away</h5>
                <p className='font-normal text-xs text-gray-600'>Affordable, compact riders</p>
            </div>
            <h2 className='text-lg font-semibold'>₹129.20</h2>
            </div>
            <div onClick={()=>{
                setConfirmRidePanel(true)
                setVehiclePanel(false)
            }} className='flex border-2 border-transparent active:border-black rounded-2xl mb-2 bg-gray-200 w-full p-3 items-center justify-between'>
            <img className='h-12' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n" alt="" />
            <div className='w-1/2'>
                <h4 className='font-medium text-base'>Moto <span><i className='ri-user-3-fill'>1</i></span></h4>
                <h5 className='font-medium text-sm'>3 mins away</h5>
                <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
            </div>
            <h2 className='text-lg font-semibold'>₹92.20</h2>
            </div>
            <div onClick={()=>{
                setConfirmRidePanel(true)
                setVehiclePanel(false)
            }}     className='flex border-2 border-transparent active:border-black rounded-2xl mb-2 w-full bg-gray-200  p-3 items-center justify-between'>
            <img className='h-12' src='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1152/height=768/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n' alt="" />
            <div className='w-1/2'>
                <h4 className='font-medium text-base'>UberAuto <span><i className='ri-user-3-fill'>3</i></span></h4>
                <h5 className='font-medium text-sm'>2 mins away</h5>
                <p className='font-normal text-xs text-gray-600'>Affordable, compact riders</p>
            </div>
            <h2 className='text-lg font-semibold'>₹179.20</h2>
            </div>
        </div>
    )
}

export default VehiclePanel