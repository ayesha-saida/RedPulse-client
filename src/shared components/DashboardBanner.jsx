import React, { useContext } from 'react'
import { AuthContext } from '../Pages/Context/AuthProvider'
import Marquee from "react-fast-marquee";

const DashboardBanner = () => {
  const {user} = useContext(AuthContext)

  if(!user) return null

  return (
    <div>
     <Marquee pauseOnHover={true}>   
      <h2 className='p-5 italic'>Welcome to Red Pulse {user?.displayName}</h2>
      </Marquee>
  </div> 
       
  )
}

export default DashboardBanner 