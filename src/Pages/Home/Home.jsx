import React from 'react'
import Banner from './banner/Banner'
import StateSection from './feature/StateSection'

const Home = () => {
  return (
    <div className='w-11/12 mx-auto'>
     {/* Banner / Hero */} 
      <Banner />

     {/* State Section */}
       <StateSection /> 
    </div>
  )
}

export default Home