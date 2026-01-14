import React, { useEffect } from 'react'
import { useCaptainData } from '../context/CaptainContext'

const Home = () => {
  const {captain} = useCaptainData()
  useEffect(()=>{
    console.log(captain)
  },[])
  return (
    <div>
      Home
    </div>
  )
}

export default Home
