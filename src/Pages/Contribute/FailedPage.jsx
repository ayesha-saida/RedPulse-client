import React from 'react'

const FailedPage = () => {
  return (
    <div  className='min-h-screen flex items-center justify-center'>  
     
     <div className='text-center'>
      <h1 className='text-red-500  text-3xl sm:text-5xl font-semibold mb-3'> 
        Donation Failed! </h1>
      <p className='text-red-500  text-xl sm:text-2xl'> Please try again. </p>
    </div>

    </div>
  )
}

export default FailedPage