import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router'
import Logo from './Logo'
import { AuthContext } from '../Pages/Context/AuthProvider'
import { defaultToast } from './ToastContainer'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../Hooks/useAxiosSecure'
import Loading from './Loading'
 

const Navbar = () => {
      const {user, logOut } = useContext(AuthContext);
      const axiosSecure = useAxiosSecure()

      const { data: users = [] } = useQuery({
      queryKey: ['users', user?.email],
      enabled: !!user?.email,  
      queryFn: async() => {
        const res = await 
        axiosSecure.get("/users", {
          params: { email: user.email }
        })
          return res.data
      }
     })

     const currentUser = users[0];

   if (!currentUser) return <Loading /> 
    
       const handleLogOut = () => {
        logOut().then(() => {
           defaultToast('SignOut from Red Pulse')
          })
        .catch(error => {
           console.log(error)
       });
            }
  
  const links = <>
  <li><NavLink>Donate</NavLink></li>
  <li><NavLink>Funding</NavLink></li>
  </>
  return (
 <div className="navbar bg-[#eb2c29] text-white shadow-sm">
  <div className="navbar-start">
     <Logo />  
   </div>

     <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-2xl">
       {links}
    </ul>
  </div>
  
   <div  className="navbar-end">
     <div className=" flex gap-2 ">

   {/* User Avatar Dropdown */}
  {
     user && currentUser && (<div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            src={currentUser?.photoURL}
            alt="current user avatar"
            />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-50 mt-3 w-52 p-2 shadow left-1/2 -translate-x-1/2">
        <Link  to={'/dashboard/profile'}>Dashboard</Link>
        <Link onClick={handleLogOut}>Logout</Link>
      </ul>
    </div> )
  }
  

   {/* Mobile Hamburger Menu Dropdown */}
   <div className="dropdown lg:hidden"> 
      <div tabIndex={0} role="button" className="btn btn-ghost">
      {/*  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg> */}
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/></svg>
      </div>

      <ul
        tabIndex="-1"
          className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box 
             z-50 mt-3 w-52 p-2 shadow 
             left-1/2 -translate-x-1/2">

          {links}
      </ul>
  </div>

     </div>
   </div>
 
</div>
  )
}

export default Navbar