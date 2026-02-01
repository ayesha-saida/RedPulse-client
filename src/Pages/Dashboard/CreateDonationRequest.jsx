import React, { useContext, useEffect } from 'react'
import { useSharedStates } from '../../Shared states/SharedStates'
import { useForm } from 'react-hook-form'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { AuthContext } from '../Context/AuthProvider'
import Loading from '../../shared components/Loading'
import { useLocation, useNavigate } from 'react-router'
import { defaultToast, successToast } from '../../shared components/ToastContainer'
import { useQuery } from '@tanstack/react-query'

const CreateDonationRequest = () => {
   const {bloodGroup , district, upazila} = useSharedStates()
   const { register, handleSubmit, watch, setValue, formState:{ errors }} = useForm()
 
   const navigate = useNavigate()
   const location = useLocation()
  //  console.log('Donation Request location:', location)
 
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
 
    const {data: userInfo} = useQuery({
       queryKey: ['users', user?.email],
      enabled: !!user?.email,
      queryFn: async() => {
        const res = await 
        axiosSecure.get(`/users/${user.email}`)
          return res.data
       }
     }) 
     // console.log(userInfo.status)

      // Return after all hooks called
         if(!user)  return (
         <>       
           {/* console.log('data not found') */}
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
             // console.log('Create Donation:',createDonation)

           const dbRes = await axiosSecure.post('/donations', createDonation)    

            successToast('Donation Request Created')
                  navigate(location.state || '/dashboard/my-donation-requests')
            } 
                 catch (error) {
                          console.log(error)
                      defaultToast('Failed to Create Reuest')
                  }  
          }  

      if ( userInfo?.status === 'block') {      
       return ( <>
        <div className="h-full flex items-center justify-center">
           <p className="text-red-500 text-3xl text-center">
          Sorry! You are not allowed to make any donation request.
            </p>
        </div> </> )
    }
   

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl sm:text-3xl lg:text-4xl py-3 text-center italic'> 
          Create Donation Request 
        </h2>

  <div className='flex justify-center'>
   <form onSubmit={handleSubmit(requestSubmit)} className='w-full md:w-3/4 lg:w-2/3 bg-[#ffdddd] border-2 border-dashed border-[#f00505] rounded p-4 my-4'>
    <fieldset className="space-y-4">
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  <div> 
  <label className="text-xs font-bold"> Requester Name </label>
  <input type="text"  className="input input-bordered w-full text-black" value={user.displayName} readOnly />
  </div>

  <div> 
  <label className="text-xs font-bold"> Requester Email </label>
  <input type="email"  className="input text-black" value={user.email} readOnly />
  </div>

  <div className='md:col-span-2'> 
  <label className="text-xs font-bold"> Recipient Name </label>
  <input type="text"  {...register("name")}  className="input input-bordered w-full text-black" placeholder="Recipient Name" />
  </div>

  <div> 
  <label className="text-xs font-bold"> Blood Group </label>
  <select  {...register("bloodGroup")}  className="select input-bordered w-full text-black">  
  <option value=''> Select Blood Group </option>
   { 
  bloodGroup.map( (group,id) =>  <option key={id}> {group.blood_group} </option> )
    }
</select>
 </div>

  <div> 
  <label className="text-xs font-bold"> Recipient District </label>
  <select {...register("district")}  className='select input-bordered w-full text-black'>
    <option value=''>Select District</option>
   { district.map((district)=> <option key={district.id} value={district.id}>{district.name}</option>)
    }
  </select>
  </div>

  <div> 
  <label className="text-xs font-bold"> Recipient Upazila </label>
    <select className="select input-bordered w-full text-black" {...register("upazila")}  disabled={!selectedDistrict}>
  <option value=''> Select Upazila </option>
    { filteredUpazilas.map( (upazila) => <option key={upazila.id} value={upazila.id}>
    {upazila.name} </option>
  )}
  </select>
  </div>

 <div className='md:col-span-2'> 
  <label className="text-xs font-bold"> Hospital Name </label>
  <input type="text"  {...register("hospitalName")}   className="input input-bordered w-full text-black" placeholder="Hospital Name" />
 </div>

 <div className='md:col-span-2'> 
  <label className="text-xs font-bold"> Location </label>
   <textarea  {...register("location")}  className="textarea textarea-bordered w-full  text-black" placeholder="Location in Details"></textarea>
 </div> 

 <div> 
  <label className="text-xs font-bold"> Donation Date </label>
  <input type="date"  {...register("donationDate")}   className="input input-bordered w-full text-black" />
 </div>

 <div>
  <label className="text-xs font-bold"> Donation Time </label>
  <input type="time"  {...register("donationTime")}   className="input input-bordered w-full text-black" />
 </div>

 <div className='md:col-span-2'>
  <label className="text-xs font-bold"> Message </label>
 <textarea  {...register("donationMessage")}  className="textarea  textarea-bordered w-full text-black" placeholder="Share details about the patient and why this blood donation is urgently needed."></textarea>
 </div>

</div>

  <button className='btn bg-[#eb2c29] text-white w-full'> Create Request </button>

  </fieldset>
    </form>
    </div>
      
  </div>
  )
}

export default CreateDonationRequest