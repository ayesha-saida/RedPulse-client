import React, { useEffect, useState } from 'react'
import { useSharedStates } from '../../Shared states/SharedStates'
import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import Loading from '../../shared components/Loading'

const SearchDonors = () => {
  
    // Shared static data (blood groups, districts, upazilas)
  const {bloodGroup , district, upazila} = useSharedStates()
    
    // React Hook Form for managing search form state 
    const { register,  watch, setValue, handleSubmit } = useForm()
     const axiosSecure = useAxiosSecure()

       // Stores submitted search parameters (used to trigger query)
     const [searchParams, setSearchParams] = useState(null)

      // Controls conditional rendering (hide table before first search) 
     const [hasSearched, setHasSearched] = useState(false);

      // Watch selected district to control dependent upazila dropdown
           const selectedDistrict = watch("district");
           
     // Filter upazila based on selected district
            const filteredUpazilas = upazila.filter(
           (u) => u.district_id  ===  (selectedDistrict)   );
           
    // Reset upazila selection whenever district changes
           useEffect(() => {
           setValue("upazila", "");
         }, [selectedDistrict, setValue]) 
       
    // Fetch filtered donors from backend using TanStack Query
   // Query runs ONLY after searchParams is set
     const {data: filteredDonors = [] , isLoading } = useQuery({
      queryKey: ['searchdonors', searchParams],
      enabled: !!searchParams,
      queryFn: async() => {
        const res = await  axiosSecure.get(`/searchdonors`,{
          params: searchParams  })
          return res.data
      }
     })

    // Handle search form submission
   // Triggers React Query by updating searchParams
     const SearchDonors = (formData) => {
          setHasSearched(true);
          setSearchParams(formData)
     } 

      // Convert stored district ID to readable district name
    const getDistrictName = (id) => {
    return district.find(d => Number(d.id) === Number(id))?.name || "Unknown"
  }

    // Convert stored upazila ID to readable upazila name
  const getUpazilaName = (id) => {
  return upazila.find(u => Number(u.id) === Number(id))?.name || "Unknown"
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
     <h2 className='text-2xl sm:text-3xl lg:text-4xl py-5 text-center italic'>Search for Donor </h2>

             {/* Search form */}
  <form onSubmit={handleSubmit(SearchDonors)}
  className='grid grid-cols-1 md:grid-cols-4 gap-4 items-end my-3'>
            
              {/* Blood Group Selector */}
  <div> 
  <label className="font-bold"> Blood Group </label>
  <select  {...register("bloodGroup")}  className="select w-full text-black text-lg">  
  <option value=''> Select Blood Group </option>
   { 
  bloodGroup.map( (group) =>  <option key={group.id}  value={group.blood_group}> {group.blood_group} </option> )
    }
</select>
 </div>
                   {/* District Selector */}
  <div> 
  <label className="font-bold"> District </label>
  <select {...register("district")}  className='select w-full text-black text-lg'>
    <option value=''>Select District</option>
   { district.map((district)=> <option key={district.id} value={district.id}>{district.name}</option>)
    }
  </select>
  </div>
                {/* Upazila Selector (depends on district)  */}
  <div className='space-y-2'> 
  <label className=" font-bold"> Upazila </label>
    <select className='select w-full text-black text-lg' {...register("upazila")}  disabled={!selectedDistrict}>
    <option value=''> Select Upazila </option>
    { filteredUpazilas.map( (upazila) => <option key={upazila.id} value={upazila.id}>
    {upazila.name} </option>
    )}
  </select>
  </div>
             {/* Search Button  */}
  <button type='submit' 
   disabled={!watch("bloodGroup") || !watch("district")}
   className="btn bg-red-600 hover:bg-red-700 text-white w-full"> Search </button>
    </form>
    

      {/* Search result  (only after search) */}       
    {hasSearched && (
      isLoading ? (
            <Loading /> 
      ) : filteredDonors.length > 0 ? (

    <>
         {/* Mobile Cards */}
            <div className="grid gap-4 my-6 md:hidden">
              {filteredDonors.map((donor) => (
                <div key={donor._id} className="card bg-base-100 shadow-md">
                  <div className="card-body">
                    <h3 className="font-bold text-lg">{donor.name}</h3>
                    <p><span className="font-semibold">Location:</span> {getUpazilaName(donor.upazila)}, {getDistrictName(donor.district)}</p>
                    <p><span className="font-semibold">Blood Group:</span> {donor.bloodGroup}</p>
                    <p className="text-green-600 font-bold">{donor.status}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Table for Tablet & Desktop */}
            <div className="hidden md:block overflow-x-auto rounded-box border border-gray-400 bg-base-100 my-5">
              <table className="table table-xs w-full">
                <thead>
                  <tr className="bg-base-200">
                    <th></th>
                    <th>Recipient Name</th>
                    <th>Donor Location</th>
                    <th>Blood Group</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody> 
                   {filteredDonors.map((donor, index) => (
                    <tr key={donor._id}>
                      <td>{index + 1}</td>
                      <td>{donor.name}</td>
                      <td>{getUpazilaName(donor.upazila)}, {getDistrictName(donor.district)}</td>
                      <td>{donor.bloodGroup}</td>
                      <td className="text-green-600 font-bold">{donor.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
      </> )
      : (
        <p className="text-center text-gray-500 my-6">
            No donors found.
          </p>
      )
   )}

    </div>
  )
}

export default SearchDonors