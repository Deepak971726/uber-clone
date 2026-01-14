import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const navigate = useNavigate()
    
    const token = localStorage.getItem('token')
    // useEffect(()=>{
    //     console.log(token)
    // },[])
    
    axios.post('http://localhost:4000/api/v1/users/logout',{},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res)=>{
        // console.log(res.status)
        if(res.status===200){
            localStorage.removeItem('token')
            navigate('/login')
            
        }
    }).catch((e)=>{
        
        console.log("error aa rha hai yr:::::",e)
    })
    
  return (
    <div>
      UserLogout
    </div>
  )
}

export default UserLogout
