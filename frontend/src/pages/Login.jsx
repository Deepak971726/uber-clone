import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUserData } from '../context/UserContext'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {user, setUser} = useUserData()
  const navigate = useNavigate()
  
  const submitHandler=async(e)=>{
     e.preventDefault()
     
      const data = {
       email,
       password
      }
    const res = await axios.post('http://localhost:5000/api/v1/users/login',data)
    // console.log(res.status)
    // console.log(res)
    
    if(res.status===200){
      setUser(res.data.user)
      localStorage.setItem('token',res.data.token)
      navigate('/home')
    }
    setEmail('')
    setPassword('')
}
  
  return (
 
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
           <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />
            <form onSubmit={submitHandler}>
              <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                <input
                  required
                  value={email}
                  type='email'
                  placeholder='email@example.com'
                  className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                  onChange={(e)=>setEmail(e.target.value)}
                />
              <h3 className='text-lg font-medium mb-2'>What's your password</h3>
                <input
                  required
                  value={password}
                  type='password'
                  placeholder='password'
                  className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <button type='submit'
                  className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                  >Login</button>
            </form>
            <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
        </div>
        
        <div>
          <Link to='/captain-login' className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>
            Sign in as Capatain
          </Link>
        </div>
      </div>
   
  )
}

export default Login
