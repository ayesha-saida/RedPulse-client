import React, { useContext, useState } from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { AuthContext } from '../Context/AuthProvider'
import Loading from '../../shared components/Loading'

const MyDonationRequest = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [selectedStatus, setSelectedStatus] = useState([]) // track selected filters

    const {data: donations = [] , isLoading } = useQuery({
      queryKey: ['donation', user?.email],
      enabled: !!user?.email,
      queryFn: async() => {
        const res = await 
        axiosSecure.get(`/donations?requesterEmail=${user.email}`)
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

     if (isLoading)  return <Loading />
     
    const myDonations = donations 

  if(myDonations.length === 0)
    return ( <>
    <div className='h-full flex items-center justify-center'>
    <p className='text-red-500 text-3xl text-center'> No Donation Request Created yet </p>
    </div>
    </> )
     
    const filteredDonations = selectedStatus.length 
    ? myDonations.filter(d => selectedStatus.includes(d.status)) 
    : myDonations

  return (
  <div className='w-11/12 mx-auto  p-4 space-y-4'>
        <h1 className='text-4xl py-2'>My Recent Donation Request</h1>      

   <div className='flex justify-around'>
      <p className='text-xl py-4'>Total Request: {myDonations.length} </p>
  
   <form className='filter py-3 space-x-3'>
      <input 
        className="btn btn-primary" 
        type="checkbox" 
        value="pending" 
        checked={selectedStatus.includes('pending')} 
        onChange={handleStatusChange} 
        aria-label="Pending"
      />  
   
      <input 
        className="btn btn-warning text-white" 
        type="checkbox" 
        value="inprogress" 
        checked={selectedStatus.includes('inprogress')} 
        onChange={handleStatusChange} 
        aria-label="Inprogress"
      />  
   
      <input 
        className="btn btn-success text-white" 
        type="checkbox" 
        value="done" 
        checked={selectedStatus.includes('done')} 
        onChange={handleStatusChange} 
        aria-label="Done"
      /> 
    
      <input 
        className="btn btn-error text-white" 
        type="checkbox" 
        value="canceled" 
        checked={selectedStatus.includes('canceled')} 
        onChange={handleStatusChange} 
        aria-label="Canceled"
      />  

      <input 
      className="btn btn-square bg-red-600 text-white" 
      type="reset" 
      value="×"
      onClick={() => setSelectedStatus([])} 
    />     
  </form>
    </div>

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
   { filteredDonations.map((donation, i) =>
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