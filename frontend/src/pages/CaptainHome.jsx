import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import RidePopUp from '../components/RidePopup'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useSocket } from '../context/SocketContext'
import { useCaptainData } from '../context/CaptainContext'

const CaptainHome = () => {
  
  const [ridePopUpPanel, setRidePopUpPanel] = useState(true)
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel]= useState(false)
  
  const ridePopUpPanelRef = useRef(null)
  const confirmRidePopUpPanelRef= useRef(null)
  const {socket} = useSocket()
  const {captain} = useCaptainData()
  
  
  useEffect(()=>{
      // console.log("use Effect use hu ::",user.user)
      socket.emit('join',{
        userType:"captain",
        userId: captain._id
      })
         console.log("captian",captain)
         
          const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        setInterval(updateLocation, 10000)
        updateLocation()
    //   console.log(socket.id)
    },[captain])
    
  
  useGSAP(function(){
    // console.log("me bhi chal rha hiu")
    if (ridePopUpPanel) {
        gsap.to(ridePopUpPanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(ridePopUpPanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
    
  },[ridePopUpPanel])
  
  useGSAP(function(){
    // console.log("me bhi chal rha hiu")
    if (confirmRidePopUpPanel) {
        gsap.to(confirmRidePopUpPanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(confirmRidePopUpPanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
    
  },[confirmRidePopUpPanel])
  
  return (
    <div className='h-screen'>
        <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
            <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-logout-box-r-line"></i>
            </Link>
        </div>
        <div className='h-3/5'>
            <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
        
         <div className='h-2/5 p-6'>
              {/* <CaptainDetials /> */}
              <CaptainDetails/>
          </div>
           <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12'>
                <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
          </div>
           <div ref={confirmRidePopUpPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <ConfirmRidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
          </div>
    </div>
  )
}

export default CaptainHome
