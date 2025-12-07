import React from 'react'

const SignIn = () => {
  return (
    <div>
        <h1 className='text-2xl text-center font-semibold pt-7'>Welcome to Red Pulse</h1>
   
   <div className='flex flex-col justify-center items-center py-5'> 
      <form>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

  <label className="label">Name</label>
  <input type="text" className="input" placeholder="Name" required />

  <label className="label">Email</label>
  <input type="email" className="input" placeholder="Email" required />

  <label className="label">Blood Group</label>
  <select defaultValue="select" className="select">
  <option disabled={true}> Select </option>
  <option>Crimson</option>
</select>

  <label className="label">District</label>
  <select defaultValue="select" className="select">
  <option disabled={true}> Select </option>
  <option>Crimson</option>
</select>

  <label className="label">Upazila</label>
  <select defaultValue="select" className="select">
  <option disabled={true}> Select </option>
  <option>Crimson</option>
</select>

  <label className="label">Password</label>
  <input type="password" className="input" placeholder="Password" />

  <label className="label">Confirm Password</label>
  <input type="password" className="input" placeholder="Confirm Password" />

  <button className="btn btn-neutral mt-4">Sign Up</button>
</fieldset>
      </form>
      </div>

    </div>
  )
}

export default SignIn