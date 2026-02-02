import React from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import Loading from '../../shared components/Loading'

const DonationRequest = () => {
     const axiosSecure = useAxiosSecure()

     const {data: donations = [], isLoading } = useQuery({
         queryKey: ['donations', 'pending'],
         queryFn: async() => {
         const res = await  axiosSecure.get('/donations')
              return res.data
          }
       })
    const pendingDonations = donations.filter(d => d.status === 'pending');

    if(isLoading) return <Loading /> 

  return (
 <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl text-center py-4 font-semibold'>
            Pending Donation Request </h1>      

        
                 {/* Mobile Card View */}
      <div className="grid gap-4 md:hidden m-4">
        {pendingDonations.map(donation => (
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
        
                 {/* Desktop / Tablet Table View*/}
         <div className='hidden md:block overflow-x-auto rounded-box border border-gray-300 bg-base-100 m-4'>
           <table className='table table-sm lg:table-md'>
            <thead>
              <tr className="bg-base-200">
                <th></th>
                <th>Recepient Name</th>
                <th>Location</th>
                <th>Blood Group</th>
                <th>Donation Date</th>
                <th>Donation Time</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
           { pendingDonations.map((donation, i) =>
           (<tr key={donation._id}>
                <th>{i+1}</th>
                <td>{donation.recipientName}</td>
                <td>{donation.location}</td>
                <td>{donation.bloodGroup}</td>
                <td>{donation.donationDate} </td>
                <td>{donation.donationTime}</td>
                <td>
                   <Link to={`/dashboard/donation-requests/${donation._id}`}  className='btn btn-sm md:btn-md bg-red-600 hover:bg-red-700 text-white'>View</Link>
                </td>
              </tr>  ) 
          )}
           
            </tbody>
          </table>
        </div>

  </div>
  )
}

export default DonationRequest