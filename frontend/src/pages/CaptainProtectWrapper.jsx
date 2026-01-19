import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCaptainData } from '../context/CaptainContext'
import axios from 'axios'
import { useState } from 'react'

const CaptainProtectWrapper = ({children}) => {
  
  
   const navigate = useNavigate()
   const token = localStorage.getItem('token')
   const [isLoading, setIsLoading] = useState(true);
   const {captain, setCaptain} = useCaptainData()
  
  
    useEffect(()=>{
        if(!token){
            navigate('/captain-login')
        }

        axios.get('http://localhost:5000/api/v1/captain/get-captain-profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res)=>{
          setCaptain(res.data)
          setIsLoading(false)
        })
    },[token])
    
    
    
     if(isLoading){
      return <>
        <div className="w-full h-screen rounded-md border border-blue-300 p-4">
          <div className="flex animate-pulse space-x-4">
            <div className="size-10 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 rounded bg-gray-200"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                  <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                </div>
                <div className="h-2 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
        </>
    }
    
    
    
  return (
    <>
     {children} 
    </>
  )
}

export default CaptainProtectWrapper
