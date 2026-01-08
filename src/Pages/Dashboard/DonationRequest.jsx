import React, { useContext, useEffect } from 'react'
import { useSharedStates } from '../../Shared states/SharedStates'
import { useForm } from 'react-hook-form'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { AuthContext } from '../Context/AuthProvider'
import Loading from '../../shared components/Loading'
import { data, useLocation, useNavigate } from 'react-router'
import { defaultToast, successToast } from '../../shared components/ToastContainer'

const DonationRequest = () => {
   const {bloodGroup , district, upazila} = useSharedStates()
   const { register, handleSubmit, watch, setValue, formState:{ errors }} = useForm()
 
   const navigate = useNavigate()
   const location = useLocation()
   console.log('Donation Request location:', location)
 
   const {user} = useContext(AuthContext);

      const axiosSecure = useAxiosSecure()

       // Watch selected district
        const selectedDistrict = watch("district");
      
        // Filter upazila based on selected region
        const filteredUpazilas = upazila.filter(
          (u) => u.district_id  ===  (selectedDistrict)
        );
      
        // Reset upazila when district changes
        useEffect(() => {
          setValue("upazila", "");
        }, [selectedDistrict, setValue])
 

      // Return after all hooks called
         if(!user)  return (
         <>       
           { console.log('data not found')}
             <Loading /> 
         </> )
         
        const requestSubmit = async(data) => {
         try { 
            const createDonation = {
                requesterName: user.displayName,
                requesterEmail: user.email,
                recipientName: data.name,
                bloodGroup: data.bloodGroup,
                recipientDistrict: data.district,
                recipientUpazila: data.upazila,
                hospitalName: data.hospitalName,
                location: data.location,
                donationDate: data.donationDate,
                donationTime: data.donationTime,
                message: data.donationMessage
              }
              console.log('Create Donation:',createDonation)

           const dbRes = await axiosSecure.post('/donations', createDonation)    

            successToast('Donation Request Created')
                  navigate(location.state || '/dashboard/my-donation-requests')
            } 
                 catch (error) {
                          console.log(error)
                      defaultToast('Failed to Create Reuest')
                  }  
          }  

  return (
    <div className='w-11/12 mx-auto'>
        <h2 className='text-2xl py-3 text-center italic'>Create Donation Request </h2>

  <div className='flex justify-center items-center'>
   <form onSubmit={handleSubmit(requestSubmit)} className='text-[#f00505] bg-[#ffdddd]  border-2 border-dashed border-[#f00505] rounded w-xs'>
    <fieldset className="fieldset  p-4">
 
 <div>
  <label className="text-xs font-bold"> Requester Name </label>
  <input type="text"  className="input text-black" value={user.displayName} readOnly />
  </div>

  <div> 
  <label className="text-xs font-bold"> Requester Email </label>
  <input type="email"  className="input text-black" value={user.email} readOnly />
  </div>

  <div> 
  <label className="text-xs font-bold"> Recipient Name </label>
  <input type="text"  {...register("name")}  className="input text-black" placeholder="Recipient Name" />
  </div>

  <div> 
  <label className="text-xs font-bold"> Blood Group </label>
  <select  {...register("bloodGroup")}  className="select text-black">  
  <option value=''> Select Blood Group </option>
   { 
  bloodGroup.map( (group,id) =>  <option key={id}> {group.blood_group} </option> )
    }
</select>
 </div>

  <div> 
  <label className="text-xs font-bold"> Recipient District </label>
  <select {...register("district")}  className='select text-black'>
    <option value=''>Select District</option>
   { district.map((district)=> <option key={district.id} value={district.id}>{district.name}</option>)
    }
  </select>
  </div>

  <div> 
  <label className="text-xs font-bold"> Recipient Upazila </label>
    <select className="select text-black" {...register("upazila")}  disabled={!selectedDistrict}>
  <option value=''> Select Upazila </option>
    { filteredUpazilas.map( (upazila) => <option key={upazila.id} value={upazila.id}>
    {upazila.name} </option>
  )}
  </select>
  </div>

 <div> 
  <label className="text-xs font-bold"> Hospital Name </label>
  <input type="text"  {...register("hospitalName")}   className="input text-black" placeholder="Hospital Name" />
 </div>

 <div> 
  <label className="text-xs font-bold"> Location </label>
   <textarea  {...register("location")}  className="textarea text-black" placeholder="Location in Details"></textarea>
 </div> 

 <div> 
  <label className="text-xs font-bold"> Donation Date </label>
  <input type="date"  {...register("donationDate")}   className="input text-black" />
 </div>

 <div>
  <label className="text-xs font-bold"> Donation Time </label>
  <input type="time"  {...register("donationTime")}   className="input text-black" />
 </div>

 <div>
  <label className="text-xs font-bold"> Message </label>
 <textarea  {...register("donationMessage")}  className="textarea text-black" placeholder="Share details about the patient and why this blood donation is urgently needed."></textarea>
 </div>

  <button className="btn bg-[#eb2c29] text-white mt-4"> Create Request </button>

  </fieldset>
    </form>
    </div>
      
  </div>
  )
}

export default DonationRequest