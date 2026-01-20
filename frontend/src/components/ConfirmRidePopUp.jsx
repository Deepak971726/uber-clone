import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState(null)
  const navigate = useNavigate()
  
  const submitHander= async(e)=>{
    e.preventDefault()
    
    const data={
        rideId:props.confirmRideData?._id,
        userId:props.confirmRideData?.user._id
    }
    
    const res = await axios.get(`${import.meta.VITE_SERVER_URI}/ride/start-ride`,{
      params:{
        rideId:data.rideId,
        userId:data.userId,
        otp:otp
      },
       headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    console.log("ride starred and this is response from server",res)
    navigate('/captain-riding',{
        state:{
            ride:res.data.ride
        }
    })
    
    // console.log(data,otp)
    // console.log(res)
  }
  return (
     <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setRidePopUpPanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
            <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                    <h2 className='text-lg font-medium capitalize'>{props.confirmRideData?.user.fullName.firstName+" "+props.confirmRideData?.user.fullName.lastName}</h2>
                </div>
                <h5 className='text-lg font-semibold'>{props.confirmRideData?.distance}KM</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-gray-300 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.confirmRideData?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-gray-300 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.confirmRideData?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.confirmRideData?.fare} </h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>

                <div className='mt-6 w-full'>
                    <form onSubmit={submitHander}>
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' placeholder='Enter OTP' />
                                {/* // to='/captain-riding */}
                        <button type='submit' className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
                        <button onClick={() => {
                            props.setConfirmRidePopUpPanel(false)
                            props.setRidePopUpPanel(false)

                        }} className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'>Cancel</button>

                    </form>
                </div>
            </div>
        </div>
  )
}

export default ConfirmRidePopUp
