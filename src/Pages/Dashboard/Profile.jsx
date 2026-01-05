import React, { useContext, useState } from 'react'
import DashboardBanner from '../../shared components/DashboardBanner'
import { AuthContext } from '../Context/AuthProvider'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import Swal from 'sweetalert2'
import { useSharedStates } from '../../Shared states/SharedStates'

const Profile = () => {
  const {user} = useContext(AuthContext)

  if (!user) {
  return <p>User not logged in</p>;
}

 const { bloodGroup, district, upazila } = useSharedStates();

  const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState(null);
   const axiosSecure = useAxiosSecure()
   
    const {refetch, data: users = [] } = useQuery({
      queryKey: ['users', user?.email],
      enabled: !!user?.email,  // prevent error when email is null
      queryFn: async() => {
        const res = await 
        axiosSecure.get("/users", {
          params: { email: user.email }
        })
          return res.data
      }
     })

     
  const currentUser = users[0];

  if (!currentUser) return <p className='text-red-500'>No user data found</p>;
    
  // find district & upazila' name using their id
        const districtName = district.find(
           (d) => d.id === currentUser.district
          )?.name;
         // console.log(districtName)
           
        const upazilaName = upazila.find(
          (u) => u.id === currentUser?.upazila
           )?.name;  

      const handleEdit = (e) => {

         setIsEditing(true);
      };

    const handleSave = () => {
  
  }  

  return (
    <div className='w-11/12 mx-auto'>
      <div className='py-5'>
          <DashboardBanner  />
      </div>


       <form className="max-w-sm mx-auto space-y-4 border p-4 rounded">        
       <div className='mb-2 text-right'>
        {!isEditing ? (
          <button onClick={handleEdit}>Edit</button>
        ) : (
          <button onClick={handleSave}>Save</button>
        )}
      </div>
 
     <div>
        <label className="block mb-2.5 text-sm font-medium text-heading">Name</label>
        <input type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body" defaultValue={currentUser.name} />
    </div>
    <div>
        <label  className="block mb-2.5 text-sm font-medium text-heading">Email</label>
        <input type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"  
         value={currentUser.email}   readOnly />
    </div>
    <div>
        <label className="block mb-2.5 text-sm font-medium text-heading">Address</label>
        <input type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded focus:ring-brand focus:border-brand block w-full px-3.5 py-3 shadow-xs placeholder:text-body"  defaultValue={`District: ${districtName || ""} & Upazila: ${upazilaName || ""}`}  />
    </div>
    <div>
        <label className="block mb-2.5 text-sm font-medium text-heading">Blood Group</label>
        <input type="text" className="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded focus:ring-brand focus:border-brand block w-full px-4 py-3.5 shadow-xs placeholder:text-body" defaultValue={currentUser.bloodGroup} />
    </div>        
  </form>

    </div>
  )
}

export default Profile