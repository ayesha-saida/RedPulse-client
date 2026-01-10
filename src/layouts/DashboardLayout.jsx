import React from 'react'
import { FaUser, FaUsers } from 'react-icons/fa'
import { MdHomeFilled } from 'react-icons/md'
import { Link, Outlet } from 'react-router'
import DashboardBanner from '../shared components/DashboardBanner'
import { RiHeartAdd2Fill } from 'react-icons/ri'
import { BiSolidDonateHeart } from 'react-icons/bi'
import { TbDropletHeart } from 'react-icons/tb'

const DashboardLayout = () => {
  return (
 <div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">

     {/* Navbar */}
      <nav className="navbar w-full bg-base-300">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
     {/* Sidebar toggle icon */}
      <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
           <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>

      </label>
         <div className="px-4"> Red Pulse </div>
    </nav>

    {/* Page content here */}
    <DashboardBanner /> 
     <Outlet />

  </div>

   <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full grow">

         <li>         
          <Link to={'/'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Home">
          <MdHomeFilled />
          <span className="is-drawer-close:hidden"> Home </span> 
         </Link>
          </li>

         <li>         
          <Link to={'/dashboard/profile'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Profile">
          <FaUser />
          <span className="is-drawer-close:hidden"> Profile </span> 
         </Link>
          </li>

         <li>         
          <Link to={'/dashboard/create-donation-request'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip=" Create Donation Request">
          <RiHeartAdd2Fill />
          <span className="is-drawer-close:hidden">Create Donation Request </span> 
         </Link>
          </li>

         <li>         
          <Link to={'/dashboard/my-donation-requests'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Donation Request">
          <BiSolidDonateHeart />
          <span className="is-drawer-close:hidden"> My Donation Request </span> 
         </Link>
          </li>

          <li>
          <Link to={'/dashboard/all-users'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Users"> 
          <FaUsers />
          <span  className="is-drawer-close:hidden"> All Users </span>
          </Link>
          </li>

          <li>
          <Link to={'/dashboard/all-blood-donation-request'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Blood Donation Request"> 
          <TbDropletHeart />
          <span  className="is-drawer-close:hidden"> All Blood Donation Request </span>
          </Link>
          </li>

            </ul>
         </div>
       </div>

    </div>
  )
}

export default DashboardLayout