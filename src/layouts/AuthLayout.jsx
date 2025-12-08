import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../shared components/Navbar'
import Footer from '../shared components/Footer'

const AuthLayout = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default AuthLayout