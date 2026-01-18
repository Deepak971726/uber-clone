import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserData } from '../context/UserContext'
import axios from 'axios'

const Signup = () => {
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {user,setUser} = useUserData()
  const navigate = useNavigate()
  
  const submitHandler=async(e)=>{
     e.preventDefault()
    // console.log(firstName,lastName,email,password)
    const data = {
       firstName,
       lastName,
       email,
       password
    }
    const res = await axios.post('http://localhost:5000/api/v1/users/register',data);
    setUser({firstName,lastName,email,password})
    console.log(res)
    console.log(res.status)
    if(res.status === 200){
      setUser(res.data.user)
      localStorage.setItem('token',res.data.token)
      navigate('/home')
      console.log(res.data.token)
      
    }
    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }
  // useEffect(()=>{
  //   console.log(user)
  // },[user])
  
  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt=""  />
          
          <form  onSubmit={submitHandler}>
            
            <h3 className='text-lg w-1/2  font-medium mb-2'>What's your name</h3>
            <div className='flex gap-4 mb-7'>
              <input 
                type='text'
                required
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                placeholder='First name'
                value={firstName}
                onChange={(e)=>{setFirstName(e.target.value)}}
              />
              <input 
                type='text'
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                placeholder='Last name'
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
              />
            </div>
            <h3 className='text-lg w-1/2  font-medium mb-2'>What's your email</h3>
            <input 
                type='email'
                required
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                placeholder='email@example.com'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              
              <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

            <input
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              type="password"
              placeholder='password'
            />
            
            <button type='submit' className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>
              Create account
            </button>
            
          </form>
             <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
        </div>
         <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
        
      </div>
    </div>
  )
}

export default Signup
