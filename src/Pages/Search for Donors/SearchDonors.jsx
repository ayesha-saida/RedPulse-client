import React, { useEffect, useState } from 'react'
import { useSharedStates } from '../../Shared states/SharedStates'
import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import Loading from '../../shared components/Loading'

const SearchDonors = () => {
    const {bloodGroup , district, upazila} = useSharedStates()
     const { register,  watch, setValue, handleSubmit } = useForm()
     const axiosSecure = useAxiosSecure()

     const [searchParams, setSearchParams] = useState(null)
     const [hasSearched, setHasSearched] = useState(false);

      // Watch selected district
           const selectedDistrict = watch("district");
           
     // Filter upazila based on selected region
            const filteredUpazilas = upazila.filter(
           (u) => u.district_id  ===  (selectedDistrict)   );
           
    // Reset upazila when district changes
           useEffect(() => {
           setValue("upazila", "");
         }, [selectedDistrict, setValue]) 

     //  submit handler 
     const SearchDonors = (formData) => {
          setHasSearched(true);
          setSearchParams(formData)
     }   

 
     const {data: filteredDonors = [] , isLoading } = useQuery({
      queryKey: ['searchdonors', searchParams],
      enabled: !!searchParams,
      queryFn: async() => {
        const res = await  axiosSecure.get(`/searchdonors`,{
          params: searchParams  })
          return res.data
      }
     })

  return (
    <div className='w-11/12 mx-auto'>
     <h2 className='text-2xl py-5 text-center '>Search for Donor </h2>

             {/* Search form */}
  <form onSubmit={handleSubmit(SearchDonors)}
  className='flex justify-center items-center py-5 space-x-4'>
  <div> 
  <label className="font-bold"> Blood Group </label>
  <select  {...register("bloodGroup")}  className="select text-black text-lg">  
  <option value=''> Select Blood Group </option>
   { 
  bloodGroup.map( (group) =>  <option key={group.id}  value={group.blood_group}> {group.blood_group} </option> )
    }
</select>
 </div>

  <div> 
  <label className="font-bold"> District </label>
  <select {...register("district")}  className='select text-black text-lg'>
    <option value=''>Select District</option>
   { district.map((district)=> <option key={district.id} value={district.id}>{district.name}</option>)
    }
  </select>
  </div>

  <div className='space-y-2'> 
  <label className=" font-bold"> Upazila </label>
    <select className='select text-black text-lg' {...register("upazila")}  disabled={!selectedDistrict}>
    <option value=''> Select Upazila </option>
    { filteredUpazilas.map( (upazila) => <option key={upazila.id} value={upazila.id}>
    {upazila.name} </option>
    )}
  </select>
  </div>

  <button type='submit' 
   disabled={!watch("bloodGroup") || !watch("district")}
   className="btn text-white mt-4 bg-red-600 hover:bg-red-700"> Search </button>
    </form>
    

      {/* Donor table (only after search) */}       
    {hasSearched && (
      isLoading ? (
            <Loading /> 
      ) : filteredDonors.length > 0 ? (
     <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-5">
      <table className="table table-xs">
      <thead>
      <tr className="bg-base-200">
        <th></th>
        <th>Recepient Name</th>
        <th>Donor Location</th>
        <th>Blood Group</th>
        <th>Donation Staus</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
     {filteredDonors.map((donor, index) => (
                <tr key={donor._id}>
                  <td>{index + 1}</td>
                  <td>{donor.name}</td>
                  <td>{donor.upazila}, {donor.district}</td>
                  <td>{donor.bloodGroup}</td>
                  <td className="text-green-600 font-bold">{donor.status}</td>
                </tr>        ))}
       </tbody>
      </table>
     </div>   
     ) : (
    <p className="text-center text-gray-500 mt-6">
      No donors found.
    </p>
  )
   )}


    </div>
  )
}

export default SearchDonors