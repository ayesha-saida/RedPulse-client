import React from 'react'
import logo from  '../assets/blood_donation.jpg'

const Footer = () => {
  return (
    <div className='bg-[#eb2c29] text-white '>
      <div className="footer sm:footer-horizontal rounded  p-10 flex justify-evenly">
  <div>
     <h6 className="footer-title text-xl font-bold">Red Pulse</h6>
    <img src={logo} className='w-24 h-22 rounded-xl' />
  </div>

  <div>
    <h6 className="footer-title text-xl font-bold">Services</h6>
    <a className="link link-hover text-lg">Add Blood Request</a>
    <a className="link link-hover text-lg">Search Blood Donors </a>
  </div>
  </div>
  
<hr class="border-b-neutral-400  mx-6 lg:my-3 my-2" />
  <div className='footer footer-center mt-3 sm:mt-0'>
    <p className='px-2 pb-3 text-sm text-gray-300'>Copyright © 2025 - All right reserved by Red Pulse</p>
  </div>

  </div>
  )
}

export default Footer