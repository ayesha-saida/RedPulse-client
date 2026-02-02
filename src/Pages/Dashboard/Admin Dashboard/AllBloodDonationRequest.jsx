import React, { useState } from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import Swal from 'sweetalert2'

const AllBloodDonationRequest = () => {
  
    const axiosSecure = useAxiosSecure()
    const [selectedStatus, setSelectedStatus] = useState([]) // track selected filters

    const {data: donations = [], refetch } = useQuery({
      queryKey: ['donation'],
      queryFn: async() => {
        const res = await 
        axiosSecure.get(`/donations`)
          return res.data
      }
     })
  
    const handleStatusChange = (e) => {
      const status = e.target.value
        if (e.target.checked) {
         setSelectedStatus(prev => [...prev, status])
        } else {
         setSelectedStatus(prev => prev.filter(s => s !== status))
      }
    } 

    const updateDonationStatus = (e, donation) => {
       const statusInfo = e.target.value
       
        axiosSecure.patch(`/donations/${donation._id}/status`,{ status: statusInfo})
               .then(res => {
                     //  console.log(res.data);
                  if (res.data.modifiedCount) {
                          refetch();
                     Swal.fire({
                     title: `Blood Donation request for ${donation.recipientName} is ${statusInfo}`,
                      icon: "success",
                     draggable: true
               });
                  }
               })
          }

    const filteredDonations = selectedStatus.length 
     ? donations.filter(d => selectedStatus.includes(d.status)) 
       : donations


  return (
  <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6'>
             {/* Title */}
      <h2 className='text-2xl sm:text-3xl lg:text-4xl text-center py-4 font-semibold'>
        All Blood Donation Requests
      </h2>

     <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <p className='text-lg md:text-xl'>Total Donation Request: {donations.length} </p>

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

           {/* MOBILE CARD VIEW */}
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
             
              <select
                className="select select-sm w-full"
                defaultValue={donation.status}
                onChange={(e) => updateDonationStatus(e, donation)}
              >
                <option value="pending">Pending</option>
                <option value="inprogress">Inprogress</option>
                <option value="done">Done</option>
                <option value="canceled">Canceled</option>
              </select>
              
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
      
           {/* DESKTOP / TABLET TABLE VIEW */}
   <div className='hidden md:block overflow-x-auto rounded-box border border-gray-400 bg-base-100 my-4'>
      <table className='table table-sm lg:table-md'>
      <thead>
      <tr className="bg-base-200">
        <th></th>
        <th>Recepient Name</th>
        <th>Location</th>
        <th>Blood Group</th>
        <th>Donation Date</th>
        <th>Donation Time</th>
        <th>Donation Staus</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
   { filteredDonations.map((donation, i) =>
   (<tr key={donation._id}>
        <th>{i+1}</th>
        <td>{donation.recipientName}</td>
        <td>{donation.location}</td>
        <td>{donation.bloodGroup}</td>
        <td>{donation.donationDate} </td>
        <td>{donation.donationTime}</td>
        <td>
           <select  className="select select-sm md:select-md" defaultValue={donation.status}
           onChange={(e) => updateDonationStatus(e,donation)}  >

           <option value={'pending'}> Pending </option> 
           <option value={'inprogress'}> Inprogress </option> 
           <option value={'done'}> Done </option>         
           <option value={'canceled'}> Canceled </option>         
            </select>
        </td>
        <td>
           <Link to={`/dashboard/donation-requests/${donation._id}`} className='btn btn-sm md:btn-md bg-red-600 hover:bg-red-700 text-white'>View</Link>
        </td>
      </tr>  ) 
   )}
   
    </tbody>
  </table>
</div>

    </div>
  )
}

export default AllBloodDonationRequest