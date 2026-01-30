import React, { useContext } from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const UsersManagement = () => {
   const axiosSecure = useAxiosSecure()

   const {refetch, data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async() => {
      const res = await 
      axiosSecure.get(`/users`)
        return res.data
    }
   })

   const updateUserRole = (e,user) => {
         const roleInfo = e.target.value; // the new selected role
    //  console.log("Updating", user.name, "to role:", roleInfo);

         axiosSecure.patch(`/users/${user._id}/role`, {role: roleInfo})   // send role as object
              .then(res => {
               // console.log(res.data);
             if (res.data.modifiedCount) {
                   refetch();

                Swal.fire({
                     title: "Are you sure?",
                     text: `You want to update ${user.name} to ${roleInfo}`,
                     icon: "warning",
                     showCancelButton: true,
                     confirmButtonColor: "#3085d6",
                     cancelButtonColor: "#d33",
                     confirmButtonText: "Yes"
                         }).then((result) => {
                      if (result.isConfirmed) {
                       Swal.fire({
                    title: `${user.name} marked as ${roleInfo}`,
                    icon: "success"
                             });
                        }
                  });
           }
        })     
   }

     const  updateUsersStatus = (e, user) => {
     const statusInfo = e.target.value

     axiosSecure.patch(`/users/${user._id}/status`,{ status: statusInfo})
        .then(res => {
                console.log(res.data);
           if (res.data.modifiedCount) {
                   refetch();
              Swal.fire({
              title: `${user.name} is ${statusInfo}`,
               icon: "success",
              draggable: true
        });
           }
        })
   }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className='text-2xl sm:text-3xl lg:text-4xl text-center py-4 font-semibold'>Total Users: {users.length} </h2>    
        
          {/* Mobile Card View */}
      <div className="grid gap-4 md:hidden">
        {users.map((user) => (
          <div key={user._id} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={user.photoURL} alt="users avatar" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm">{user.email}</p>
                </div>
              </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <label className="text-sm font-semibold">Role</label>
                  <select
                    className="select select-sm w-full"
                    value={user.role}
                    onChange={(e) => updateUserRole(e, user)}
                  >
                    <option value="donor">Donor</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>    

            <div>
                  <label className="text-sm font-semibold">Status</label>
                  <select
                    className="select select-sm w-full"
                    value={user.status}
                    onChange={(e) => updateUsersStatus(e, user)}
                  >
                    <option value="active">Active</option>
                    <option value="block">Block</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>       

          {/* Desktop / Tablet Table View */}
  <div className="hidden md:block overflow-x-auto  rounded-box border border-base-content/5 bg-base-100">
  <table className="table  table-sm lg:table-md">

    <thead>
      <tr className="bg-base-200">
        <th>
        </th>
        <th>Avatar</th>
        <th>Email</th>
        <th>Name</th>
        <th>Role</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>   
      {
        users.map((user,index) =>  <tr key={user._id}>
        <td>
          {index + 1}
        </td>

        <td>           
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={user.photoURL}
                  alt="users avatar" />
              </div>
            </div> 
        </td>

        <td> {user.email} </td>

        <td className='font-semibold'>{user.name}</td>

        <td>
           <select  className="select select-sm md:select-md" defaultValue={user.role}
           onChange={(e) => updateUserRole(e,user)}
           >    
           <option value={'donor'}> Donor </option> 
           <option value={'volunteer'}> Volunteer</option> 
           <option value={'admin'}> Admin </option>         
            </select>
        </td>

        <td>
           <select  className="select select-sm md:select-md" defaultValue={user.status}
           onChange={(e) => updateUsersStatus(e,user)}
           >    
           <option value={'active'}> Active </option> 
           <option value={'block'}> Block </option>         
            </select>
        </td>  
      </tr> 
      )}  
  
    </tbody>
  </table>
</div>   

    </div>
  )
}
 
export default UsersManagement