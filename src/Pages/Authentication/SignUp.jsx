import React from 'react'
import { Link } from 'react-router'

const SignUp = () => {
  return (
     <div className='w-11/12 mx-auto'>
        <h1 className='text-2xl text-center font-semibold pt-7'>Welcome! Please Register to Access Our Blood Donation Services</h1>
   
  <div className='flex flex-col justify-center items-center py-5'> 
      <form>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
   
       {/*name field */}
  <label className="label">Name</label>
  <input type="text" className="input" placeholder="Name" required />
   
      {/*email field */}
  <label className="label">Email</label>
  <input type="email" className="input" placeholder="Email" required />

      {/*photo image field */}
  <label className="label">Photo</label>
  <input type="file" className="file-input" placeholder="Upload your profile picture" />

      {/*blood group selection field */}
  <label className="label">Blood Group</label>
  <select defaultValue="select" className="select">
  <option disabled={true}> Select </option>
  <option>Crimson</option>
</select>

      {/*district group selection field */}
  <label className="label">District</label>
  <select defaultValue="select" className="select">
  <option disabled={true}> Select </option>
  <option>Crimson</option>
</select>

      {/*upazila group selection field */}
  <label className="label">Upazila</label>
  <select defaultValue="select" className="select">
  <option disabled={true}> Select </option>
  <option>Crimson</option>
</select>

  <label className="label">Password</label>
  <input type="password" className="input" placeholder="Password" />

  <label className="label">Confirm Password</label>
  <input type="password" className="input" placeholder="Confirm Password" />

  <button className="btn bg-[#eb2c29] text-white mt-4">Register</button>

  <p className='pt-2 text-center text-base-content'>Already have an account? <Link to={'/login'} className='text-primary hover:underline hover:text-blue-500'> Login </Link> </p>
 </fieldset>
      </form>
    </div>

    </div>
  )
}

export default SignUp