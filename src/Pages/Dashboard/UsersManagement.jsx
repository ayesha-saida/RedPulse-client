import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const UsersManagement = () => {
   const {user} = useContext(AuthContext)
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
                console.log(res.data);
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
    <div className='w-11/12 mx-auto'>
        <h2 className='text-4xl py-4'>Total Users: {users.length} </h2>    
        
        <div className="overflow-x-auto">
  <table className="table border">

    <thead>
      <tr>
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
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={user.photoURL}
                  alt="users avatar" />
              </div>
            </div>
          </div>
        </td>

        <td> {user.email} </td>

        <td className='font-semibold'>{user.name}</td>

        <td>
           <select  className="select" defaultValue={user.role}
           onChange={(e) => updateUserRole(e,user)}
           >    
           <option value={'donor'}> Donor </option> 
           <option value={'volunteer'}> Volunteer</option> 
           <option value={'admin'}> Admin </option>         
            </select>
        </td>

        <td>
           <select  className="select" defaultValue={user.status}
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