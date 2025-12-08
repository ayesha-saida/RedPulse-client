import React from 'react'
import Navbar from '../shared components/Navbar'
import Footer from '../shared components/Footer'
import { Outlet } from 'react-router'

const RootLayout = () => {
  return (
    <>
      <Navbar></Navbar>
       <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}

export default RootLayout