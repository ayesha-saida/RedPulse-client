import React from 'react'
import { Link } from 'react-router'

const Funding = () => {
  return (
 <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6'>
    
     <div className='flex justify-evenly space-x-3 pt-3'>
      <h1 className='text-3xl'> Funding Page </h1>
      <button className='text-xl bg-success text-white p-2 rounded'>
        Give Fund 
      </button>
    </div>

           {/* MOBILE CARD VIEW */}
      <div className="grid gap-4 md:hidden">

          <div className="card bg-base-100 shadow-md">
            <div className="card-body space-y-2">
              <h3 className="text-lg font-bold">
                Donor Name
              </h3>

              <p><span className="font-semibold">Amount:</span> amount </p>
              <p><span className="font-semibold">Funding Date:</span> funding date </p>             
    
            </div>
          </div>
       </div>

           {/* DESKTOP / TABLET TABLE VIEW */}      
  <div className='hidden md:block overflow-x-auto rounded-box border border-base-content/5 bg-base-100'>
      <table className='table table-sm lg:table-md'>
      <thead>
      <tr className="bg-base-200">
        <th> </th>
        <td> Name </td>
        <td> Amount </td>
        <td> Funding Date </td>
      </tr>
    </thead>
    <tbody>
 
  <tr>
        <th> </th>
        <td> Donor Name </td>
        <td> Amount </td>
        <td> Funding Date </td>
   
      </tr>  
    </tbody>
  </table>
   </div>

    </div>
  )
}

export default Funding