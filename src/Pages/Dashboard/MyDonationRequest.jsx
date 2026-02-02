import React, { useContext, useState } from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { AuthContext } from '../Context/AuthProvider'
import Loading from '../../shared components/Loading'

const MyDonationRequest = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [selectedStatus, setSelectedStatus] = useState('') // track selected filters

    const {data: donations = [] , isLoading } = useQuery({
      queryKey: ['donation', user?.email],
      enabled: !!user?.email,
      queryFn: async() => {
        const res = await 
        axiosSecure.get(`/donations?requesterEmail=${user.email}`)
          return res.data
      }
     })

     if (isLoading)  return <Loading />
     
    const myDonations = donations 

  if(myDonations.length === 0)
    return ( <>
    <div className='h-full flex items-center justify-center'>
    <p className='text-red-500 text-3xl text-center'> No Donation Request Created yet </p>
    </div>
    </> )
     
    const filteredDonations = selectedStatus
    ? myDonations.filter(d => d.status === selectedStatus) 
    : myDonations

  return (
  <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl text-center py-4 font-semibold'>My Recent Donation Request</h1>      

   <div className='flex flex-row gap-4  md:items-center md:justify-between'>
      <p className='text-lg md:text-xl'>Total Request: {myDonations.length} </p>
   
      {/* Donation Status Filtering Form */}
   <form className='flex flex-wrap gap-2 justify-center md:justify-end'> 
      <input 
        className="btn btn-sm md:btn-md btn-primary" 
        type="radio" 
        value="pending" 
        checked={selectedStatus  === 'pending'} 
        onChange={(e) => setSelectedStatus(e.target.value)} 
        aria-label="Pending"
      />  
   
      <input 
        className="btn btn-sm md:btn-md btn-warning text-white" 
        type="radio" 
        value="inprogress" 
        checked={selectedStatus  === 'inprogress'} 
        onChange={(e) => setSelectedStatus(e.target.value)} 
        aria-label="Inprogress"
      />  
   
      <input 
        className="btn btn-sm md:btn-md btn-success text-white" 
        type="radio" 
        value="done" 
        checked={selectedStatus  === 'done'} 
        onChange={(e) => setSelectedStatus(e.target.value)} 
        aria-label="Done"
      /> 
    
      <input 
        className="btn btn-sm md:btn-md btn-error text-white" 
        type="radio" 
        value="canceled" 
        checked={selectedStatus  === 'canceled'} 
        onChange={(e) => setSelectedStatus(e.target.value)} 
        aria-label="Canceled"
      />       
    
    <button 
     className="btn btn-sm md:btn-md btn-square bg-red-600 text-white" 
     type="button"
     value="×"
     onClick={() => setSelectedStatus('')}>
      X
     </button>
     </form>
    </div>

           {/* Mobile Card View */}
      {filteredDonations.length > 0 && (
  <div className="grid gap-4 md:hidden">
    {filteredDonations.map(donation => (
      <div key={donation._id} className="card bg-base-100 shadow-md">
        <div className="card-body space-y-2">
          <h3 className="text-lg font-bold">
            {donation.recipientName}
          </h3>

          <p><span className="font-semibold">Location:</span> {donation.location}</p>
          <p><span className="font-semibold">Blood Group:</span> {donation.bloodGroup}</p>
          <p><span className="font-semibold">Date:</span> {donation.donationDate}</p>
          <p><span className="font-semibold">Time:</span> {donation.donationTime}</p>

          <Link
            to={`/dashboard/donation-requests/${donation._id}`}
            className="btn btn-sm bg-red-600 hover:bg-red-700 text-white w-full"
          >
            View
          </Link>
        </div>
      </div>
    ))}
   </div>
  )}
          
    {filteredDonations.length === 0 && selectedStatus && (
      <p className="md:hidden text-xl text-center text-gray-500 pt-6">
       No donation requests found for <span className="font-semibold">{selectedStatus}</span> status
     </p>
    )}

         {/* Desktop / Tablet Table View*/}
    {filteredDonations.length > 0 && (
  <div className='hidden md:block overflow-x-auto rounded-box border border-base-content/5 bg-base-100'>
    <table className='table table-sm lg:table-md'>
      <thead>
        <tr className="bg-base-200">
          <th></th>
          <th>Recipient Name</th>
          <th>Location</th>
          <th>Blood Group</th>
          <th>Donation Date</th>
          <th>Donation Time</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {filteredDonations.map((donation, i) => (
          <tr key={donation._id}>
            <th>{i + 1}</th>
            <td>{donation.recipientName}</td>
            <td>{donation.location}</td>
            <td>{donation.bloodGroup}</td>
            <td>{donation.donationDate}</td>
            <td>{donation.donationTime}</td>
            <td>
              <Link
                to={`/dashboard/donation-requests/${donation._id}`}
                className='btn btn-sm md:btn-md bg-red-600 hover:bg-red-700 text-white'
              >
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
 )}

    {filteredDonations.length === 0 && selectedStatus && (
  <p className="hidden text-2xl md:block text-center text-gray-500 pt-9">
    No donation requests found for <span className="font-semibold">{selectedStatus}</span> status
  </p>
  )}

           
    </div>
  )
}

export default MyDonationRequest