import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import RidePopUp from '../components/RidePopup'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useSocket } from '../context/SocketContext'
import { useCaptainData } from '../context/CaptainContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'

const CaptainHome = () => {
  
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel]= useState(false)
  const [ride, setRide] = useState(null)
  const [confirmRideData, setConfirmRideData] = useState(null)
  
  
  const ridePopUpPanelRef = useRef(null)
  const confirmRidePopUpPanelRef= useRef(null)
  const {socket} = useSocket()
  const {captain} = useCaptainData()
  
  
  useEffect(()=>{
    //   console.log("use Effect use hu ::",captain.captain._id)
      socket.emit('join',{
        userType:"captain",
        userId: captain.captain._id
      })
        //  console.log("captian soket connextion ho gya hai")
         
          const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    // console.log({userId: captain._id,
                    //     location: {
                    //         ltd: position.coords.latitude,
                    //         lng: position.coords.longitude
                    //     }
                    // })
                    socket.emit('update-location-captain', {
                        userId: captain.captain._id,
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
    
    
    
    
    socket.on('new-ride',(data)=>{
        // console.log("new-ride frontend me char rha hai")
        setRidePopUpPanel(true)
        console.log(data)
        setRide(data)
        
    })
    
    
     const confirmRide=async()=> {

        const res = await axios.post('http://localhost:5000/api/v1/ride/confirm-ride', {

            rideId: ride._id,
            captainId: captain._id,

        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log("confirm ride ",res)
        setConfirmRideData(res.data.ride)

        setRidePopUpPanel(false)
        setConfirmRidePopUpPanel(true)

    }

  
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
            {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
            <LiveTracking/>
        </div>
        
         <div className='h-2/5 p-6 bg-gray-300'>
              {/* <CaptainDetials /> */}
              <CaptainDetails/>
          </div>
           <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <RidePopUp confirmRide={confirmRide} ride={ride} setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
          </div>
           <div ref={confirmRidePopUpPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <ConfirmRidePopUp confirmRideData={confirmRideData} setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
          </div>
    </div>
  )
}

export default CaptainHome
