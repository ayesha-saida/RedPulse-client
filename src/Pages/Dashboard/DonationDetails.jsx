import React, { useContext, useState }  from 'react'
import { useParams } from 'react-router'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { useSharedStates } from '../../Shared states/SharedStates'
import Loading from '../../shared components/Loading'
import { AuthContext } from '../Context/AuthProvider'
import Swal from 'sweetalert2'

const DonationDetails = () => {
    const {id} = useParams()
    //const [isModalOpen, setIsModalOpen] = useState(false)
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const {refetch, data: donations = [], isLoading, isError } = useQuery({
      queryKey: ['donation', id],
      queryFn: async() => {
        const res = await         
        axiosSecure.get(`/donations/${id}`)
          return res.data
       }      
     })

     const [formData, setFormData] = useState({
                   status: "inprogress"
        });

      const {bloodGroup, district, upazila} = useSharedStates()
       const districtName = district.find(
           (d) => d.id === donations?.recipientDistrict
          )?.name;
         // console.log(districtName)
           
        const upazilaName = upazila.find(
          (u) => u.id === donations?.recipientUpazila
           )?.name; 

     // Create a Date and time object
     const dateObj = new Date(`${donations.donationDate}T${donations.donationTime}`)
     
     const formatted = dateObj.toLocaleString('en-GB', {
            day: 'numeric',
          month: 'long',
           year: 'numeric',
           hour: 'numeric',
         minute: '2-digit',
         hour12: true
     })
   
  if (isLoading) {
    return  <Loading /> 
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">Failed to load data</div>
  }

  const confirmDonation = async() => {
    try {
          await axiosSecure.patch(`/donations/${id}`, formData)
          Swal.fire('Thanks for your participation', 'Donation Inprogress!', 'success')
          refetch()  
           console.log("Saved data:", formData);
        } 

         catch (err) {
          console.error(err)
          Swal.fire('Error', 'Failed to Confirm', 'error')
        }
  }

  return (
    <div className='max-w-3xl mx-auto p-4 space-y-4'>

         <header className="flex items-center justify-between bg-white shadow rounded-lg p-4">
          <h1 className="text-xl font-bold text-gray-800">
            Blood Donation Request
          </h1>
          <span className="bg-red-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
          {donations.bloodGroup}
          </span>
        </header>

        {/* Recipient Info */}
        <section className="bg-white shadow rounded-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-2">
           Patient Information
          </h3>
          <p><span className="font-medium">Name:</span> {donations.recipientName}</p>
          <p><span className="font-medium">District:</span> {districtName}</p>
          <p><span className="font-medium">Upazila:</span> {upazilaName} </p>
        </section>

         {/* Hospital Info */}
        <section className="bg-white shadow rounded-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-2">
            Hospital Information
          </h3>
          <p><span className="font-medium">Hospital:</span> {donations.hospitalName} </p>
          <p><span className="font-medium">Address:</span> {donations.location} </p>
        </section>

          {/* Donation Schedule */}
        <section className="bg-white shadow rounded-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-2">
            Donation Schedule
          </h3>
          <p> {formatted} </p>
        </section>

        {/* Message */}
        <section className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-semibold text-red-700 mb-2">
            Why blood is needed
          </h3>
          <p className="text-red-600">
            {donations.message}
          </p>
        </section>

         {/* Donate Button onClick open a modal */}
        <button
          onClick={()=>document.getElementById('modal').showModal()}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition">
           Donate Blood
        </button>

        {/* Donation confirmation modal */}
   <dialog id="modal" className="modal modal-bottom sm:modal-middle">
    <div className="modal-box">
     <h3 className="font-bold text-lg py-2">Are you Sure about the donation?</h3>
      <p className="py-1">Donor Name: {user.displayName} </p>
      <p className="py-1">Donor Email: {user.email} </p>
    <div className="modal-action">
      <form method="dialog" className='space-x-4'>
        <button className="btn btn-success text-black" onClick={confirmDonation}> Confirm </button>
        <button className="btn btn-error text-black"> Cancel</button>
       </form>
     </div>
     </div>
   </dialog>

    </div>
  )
}

export default DonationDetails