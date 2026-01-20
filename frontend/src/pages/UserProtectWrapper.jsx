import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserData } from '../context/UserContext'
import axios from 'axios'

const UserProtectWrapper = ({children}) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [isLoading, setIsLoading] = useState(true);
    const {user, setUser} = useUserData()
    
    useEffect(()=>{
        if(!token){
            navigate('/login')
        }

        axios.get(`${import.meta.VITE_SERVER_URI}/users/get-user-profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res)=>{
          setUser(res.data)
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

export default UserProtectWrapper
