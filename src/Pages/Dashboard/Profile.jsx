import React, { useContext, useEffect, useState } from 'react'
import DashboardBanner from '../../shared components/DashboardBanner'
import { AuthContext } from '../Context/AuthProvider'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import Swal from 'sweetalert2'
import { useSharedStates } from '../../Shared states/SharedStates'
import { FaRegEdit, FaRegSave } from 'react-icons/fa'
import Loading from '../../shared components/Loading'

const Profile = () => {
  const {user} = useContext(AuthContext)

   const { bloodGroup, district, upazila } = useSharedStates();

   const [isEditing, setIsEditing] = useState(false)
   const [formData, setFormData] = useState({
              name: "",
              address: "",
              upazila: "",    
              bloodGroup: "",
   });
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

   // Update formData when currentUser loads
       useEffect(() => {
        if (currentUser) {
           setFormData({
            name: currentUser.name || "",
            district: currentUser.district || "",
            upazila: currentUser.upazila || "",
            bloodGroup: currentUser.bloodGroup || ""
          })
       }
      }, [currentUser])

    if (!user)  return console.log('User not logged in')
    if (!currentUser) return (
     <>
       {console.log('No user data found')}
         <Loading />
     </>
    )


  // find district & upazila's name using their id
        const districtName = district.find(
           (d) => d.id === currentUser.district
          )?.name;
         // console.log(districtName)
           
        const upazilaName = upazila.find(
          (u) => u.id === currentUser?.upazila
           )?.name;  


      const handleEdit = (e) => {
         e.preventDefault()
         setIsEditing(true);     
      };

      
    const handleSave = async (e) => {
       e.preventDefault()
       try {
      // Save data to backend
      await axiosSecure.patch(`/users/${currentUser.email}`, formData)
      Swal.fire('Success', 'Profile updated!', 'success')
      setIsEditing(false)
      refetch()  
       console.log("Saved data:", formData);
    } 
     catch (err) {
      console.error(err)
      Swal.fire('Error', 'Failed to update profile', 'error')
    }
  }
  

    const handleChange = (e) => {
  const { name, value } = e.target;
 
  setFormData(prev => ({
    ...prev,
    [name]: value,
    ...(name === "district" && { upazila: "" }) // reset upazila
  }));
};


  return (
    <div className='w-11/12 mx-auto'>
       <form className="max-w-sm mx-auto space-y-4 border-[#f00505]  p-5 rounded text-[#f00505] bg-[#ffc8d1] ">        
       <div className='mb-2 text-right'>
        {!isEditing ? (
          <button onClick={handleEdit}> <FaRegEdit /> </button>
        ) : (
          <button onClick={handleSave}> <FaRegSave /></button>
        )}
      </div>
 
     <div>
        <label className="block mb-2.5 text-sm font-medium text-heading">Name</label>
        <input name='name' type="text" value={currentUser.name} onChange={handleChange} disabled={!isEditing} 
           className="input" />
    </div>

    <div>
        <label  className="block mb-2.5 text-sm font-medium text-heading">Email</label>
        <input type="text" className="input"  
         value={currentUser.email}   readOnly />
    </div>

    <div>
        <label className="block mb-2.5 text-sm font-medium text-heading">District</label>
          <select
                 name="district"
                value={formData.district}
                onChange={handleChange}
                disabled={!isEditing}  
                 className="input"                               >
         <option value="">{districtName}</option>
          {district.map(d => (
           <option key={d.id} value={d.id}>{d.name}</option>
         ))}
          </select>

    </div>

    <div>
        <label className="block mb-2.5 text-sm font-medium text-heading">Upazila</label>          
               <select
                  name="upazila"
                 value={formData.upazila}
                 onChange={handleChange}
                 disabled={!isEditing } 
                  className="input" 
                    >
        <option value=""> {upazilaName}</option>
         {upazila.filter(u => u.district_id === formData.district).map(u => (
        <option key={u.id} value={u.id}>{u.name}</option>
        ))}
       
           </select>
    </div>


    <div>
        <label className="block mb-2.5 text-sm font-medium text-heading">Blood Group</label>
        <select name='bloodGroup'
            value={formData.bloodGroup}
            onChange={handleChange}
            disabled={!isEditing || !formData.bloodGroup}
            className="input"
          >
             <option value="">{formData.bloodGroup}</option>
         {(bloodGroup).map(b => (
        <option key={b.id} value={b.blood_group}>{b.blood_group}</option>
        ))}
       
            </select>
    </div>        
  </form>

    </div>
  )
}

export default Profile