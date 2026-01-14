import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
    
    const navigate = useNavigate()
    
    const token = localStorage.getItem('token')
    // useEffect(()=>{
    //     console.log(token)
    // },[])
    
    axios.post('http://localhost:4000/api/v1/captain/logout',{},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res)=>{
        // console.log(res.status)
        if(res.status===200){
            localStorage.removeItem('token')
            navigate('/captain-login')
            
        }
    }).catch((e)=>{
        
        console.log("error aa rha hai yr:::::",e)
    })
  return (
    <div>
      captainLogout
    </div>
  )
}

export default CaptainLogout
