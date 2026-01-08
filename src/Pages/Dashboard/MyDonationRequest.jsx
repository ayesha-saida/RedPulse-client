import React from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const MyDonationRequest = () => {

  const axiosSecure = useAxiosSecure()

    const {data: donations = [] } = useQuery({
      queryKey: ['donation'],
      queryFn: async() => {
        const res = await 
        axiosSecure.get(`/donations`)
          return res.data
      }
     })


  return (
    <div className='w-11/12 mx-auto'>
        <h1 className='text-4xl py-2'>My Recent Donation Request</h1>
        <p className='py-2'>Total Request: {donations.length} </p>


         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"> 
    {
      donations.map((donation) => (
              <div key={donation._id} className="bg-white rounded-xl shadow-md p-5 w-full max-w-sm">
      <h2 className="text-xl font-semibold text-red-700 mb-3">
        {donation.recipientName}
      </h2>
      
      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-medium">Location:</span> 
          {donation.location}
        </p>
        <p>
          <span className="font-medium">Blood Group:</span>
          <span className="text-red-600 font-bold"> {donation.bloodGroup} </span>
        </p>
          <p>
          <span className="font-medium">Date:</span> {donation.donationDate}
        </p>
        <p>
          <span className="font-medium">Time:</span> {donation.donationTime}
        </p>
      </div>

      <button
      
        className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
      >
        View
      </button>
    </div>

      ))
    }
   

 </div>
        
    </div>
  )
}

export default MyDonationRequest