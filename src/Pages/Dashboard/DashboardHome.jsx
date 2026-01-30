import React from 'react'
import useRole from '../../Hooks/useRole'
import Loading from '../../shared components/Loading'
import AdminDashboardHome from './Admin Dashboard/AdminDashboardHome'
import VolunteerDashboardHome from './Volunteer Dashboard/VolunteerDashboardHome'
import DonorDashboardHome from './Donor Dashboard/DonorDashboardHome'

const DashboardHome = () => {
    const { role, roleLoading } = useRole()

    if(roleLoading) {
        return <Loading />  
    }
    if(role === 'admin') {
        return <AdminDashboardHome /> 
    }
    else if(role === 'volunteer') {
        return <VolunteerDashboardHome /> 
    }
    else {
        return <DonorDashboardHome />
    }

  return (
    <div>
        <h2>Root Dash</h2>
    </div>
  )
}

export default DashboardHome