import React, { useContext } from 'react'
import { FaUserAltSlash, FaUserCheck } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UsersManagement = () => {
   const {user} = useContext(AuthContext)
   const axiosSecure = useAxiosSecure()

   const {data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async() => {
      const res = await 
      axiosSecure.get(`/users`)
        return res.data
    }
   })

  return (
    <div>
        <h2 className='text-4xl py-4'>Total Users: {users.length} </h2>    
        
        <div className="overflow-x-auto">
  <table className="table">

    <thead>
      <tr>
        <th>
        </th>
        <th>Avatar</th>
        <th>Email</th>
        <th>Name</th>
        <th>Role</th>
        <th>Status</th>
        <th>Action</th>
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
           <select  className="select">
            <option> {user.role} </option>
            </select>
        </td>

        <td>
           {user.status} 
        </td>
        
        <td>
          {
            user.status === 'active' ?
            <button>
                  <FaUserAltSlash/>
            </button>   :  
             <button> 
                  <FaUserCheck />
            </button>
          }       
        </td>
      </tr>)
      }  
     

    </tbody>
  </table>
</div>   

    </div>
  )
}

export default UsersManagement