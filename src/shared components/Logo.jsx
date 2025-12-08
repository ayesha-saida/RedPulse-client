import React from 'react'
import logo from '../assets/blood_donation.jpg'
const Logo = () => {
  return (
    <div className='flex items-end'>
        <img src={logo} alt="blood donation logo" className='w-9 rounded' />
        <h1 className='text-2xl font-semibold mx-3'>Red Pulse</h1>
    </div>
  )
}

export default Logo