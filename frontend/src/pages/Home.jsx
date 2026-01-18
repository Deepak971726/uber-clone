import { useEffect, useRef, useState } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import axios from 'axios'
import { Await } from 'react-router-dom'

const Home = () => {
  
  const [pickup , setPickup]= useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel,setConfirmRidePanel] = useState(false)
  const [VehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [locationSearchData, setLocationSearchData] = useState(null)
  const [isPickupLocation, setIsPickupLocation] = useState(true)
  const [fare, setFare] = useState(null)
  const [vehicleType, setVehicleType] = useState("car")
   
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  
  
  
  const submitHandler=(e)=>{
    e.preventDefault()
    console.log(pickup,destination)
  }
  
  const getLocationsSuggestions = async()=>{
    
    const data = isPickupLocation?pickup:destination
    
    const res = await axios.get('http://localhost:5000/api/v1/maps/get-suggestions',{
      params:{
        input:data
      },
       headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    console.log(res.data.data)
    setLocationSearchData(res.data.data)
  }
  
  useEffect(()=>{
   getLocationsSuggestions()
  },[pickup,destination])
  
  
  const findTrip=async()=>{
    setVehiclePanel(true)
    setPanelOpen(false)
     const res = await axios.get('http://localhost:5000/api/v1/ride/get-fare',{
      params:{
        pickup:pickup,
        destination:destination
      },
       headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    console.log(res)
    setFare(res.data.fare)
     
  }
  
  useGSAP(function(){
    // console.log(panelOpen)
    if(panelOpen){
       gsap.to(panelRef.current,{
        height:'70%',
        padding:24
        // opacity:1
      })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
    }
    else{
      gsap.to(panelRef.current,{
        height:'0%',
        // opacity:0
        padding:0
      })
      gsap.to(panelCloseRef.current,{
        opacity:0
      })
    }
   
      
  },[panelOpen])
  
  
  useGSAP(function(){
    // console.log("me bhi chal rha hiu")
    if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
    
  },[vehiclePanel])
  
  useGSAP(function(){
    // console.log("me bhi chal rha hiu")
    if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(confirmRidePanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
    
  },[confirmRidePanel])
  
  useGSAP(function(){
    // console.log("me bhi chal rha hiu")
    if (VehicleFound) {
        gsap.to(vehicleFoundRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(vehicleFoundRef.current, {
            transform: 'translateY(100%)'
        })
    }
    
  },[VehicleFound])
  useGSAP(function(){
    // console.log("me bhi chal rha hiu")
    if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(waitingForDriverRef.current, {
            transform: 'translateY(100%)'
        })
    }
    
  },[waitingForDriver])
  
  
     
  return (
    <div className='h-screen relative overflow-hidden'>
      <img  className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"/>
      
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"/>
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] bg-white  relative p-6'>
          <h5 ref={panelCloseRef} className='absolute top-3 right-2 text-2xl'>
            <i onClick={()=>setPanelOpen(false)} className="ri-arrow-down-wide-line"></i>
          </h5>
          
          <h4 className='text-3xl font-semibold'>Find a trip</h4>
          <form className='relative py-3' onSubmit={(e)=>submitHandler(e)}>
            <div className='line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full'></div>
            <input 
              onChange={(e)=>setPickup(e.target.value)} 
              onClick={()=>{
                  setPanelOpen(true)
                  setIsPickupLocation(true)
                }}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5' 
              type="text" 
              value={pickup}
              placeholder='Add a pick-up location' />
            <input 
              onChange={(e)=>setDestination(e.target.value)}
               onClick={()=>{
                  setPanelOpen(true)
                  setIsPickupLocation(false)
                }}
              value={destination}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3' 
              type="text" 
              placeholder='Enter your destination' />
          </form>
           <button
              onClick={findTrip}
              className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
              Find Trip
          </button>
          {/* <button
              // onClick={findTrip}
              className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
              Find Trip
          </button> */}
        </div>
        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel setPickup={setPickup} setDestination={setDestination} isPickupLocation={isPickupLocation} locationSearchData={locationSearchData} setPanelOpen={setPanelOpen} vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel}/>
        </div>
      </div>
      
      <div ref={vehiclePanelRef} className='fixed w-full bg-white z-10 bottom-0 px-3 py-8 translate-y-full'>
          <VehiclePanel setVehicleType={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel}/>
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-1'>
        <ConfirmRide vehicleType={vehicleType} pickup={pickup} destination={destination} fare={fare} setVehicleFound={setVehicleFound} confirmRidePanel={confirmRidePanel} setConfirmRidePanel={setConfirmRidePanel}/>
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-1'>
        <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0  translate-y-full bg-white px-3 py-6 pt-1'>
        <WaitingForDriver setWaitingForDriver = {setWaitingForDriver} />
      </div>
      
    </div>
    
    
    //https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1152/height=768/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n
  )
}

export default Home
