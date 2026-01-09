import React from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'

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

       <form className='filter py-3 space-x-3'>
          <input className="btn btn-square bg-red-600 text-white" type="reset" value="×"/>
          <input className="btn btn-primary" type="checkbox" name="status" aria-label="Pending"/>
          <input className="btn btn-warning text-white" type="checkbox" name="status" aria-label="Inprogress"/>
          <input className="btn btn-success text-white" type="checkbox" name="status" aria-label="Done"/>
          <input className="btn btn-error text-white" type="checkbox" name="status" aria-label="Canceled"/>
      </form>


        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table className="table table-xs">
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
   { donations.map((donation, i) =>
   (<tr key={donation._id}>
        <th>{i+1}</th>
        <td>{donation.recipientName}</td>
        <td>{donation.location}</td>
        <td>{donation.bloodGroup}</td>
        <td>{donation.donationDate} </td>
        <td>{donation.donationTime}</td>
        <td>
           <Link to={`/dashboard/donation-requests/${donation._id}`} className='btn bg-[#f00505] hover:bg-red-700 text-white p-4 m-3'>View</Link>
        </td>
      </tr>  ) 
  )}
   
    </tbody>
  </table>
</div>
           
    </div>
  )
}

export default MyDonationRequest