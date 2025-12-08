import React from 'react'
import { Link } from 'react-router'

const SignIn = () => {
  return (
    <div className='card bg-base-100 w-full mx-auto max-w-sm  '>

     <h1 className='text-2xl text-center font-semibold pt-7 px-5'>Welcome to Red Pulse</h1>
    
    <div className='flex flex-col justify-center items-center py-5'>
   <form className='card-body'>
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

  <label className="label">Email</label>
  <input type="email" className="input" placeholder="Email" />

  <label className="label">Password</label>
  <input type="password" className="input" placeholder="Password" />

  <button className="btn bg-[#eb2c29] text-white  mt-4">Login</button>

    <p className='pt-2 text-center text-base-content'>Don't have an account? <Link to={'/register'} className='text-primary hover:underline hover:text-blue-500'> Register </Link> </p>
  </fieldset>
    </form>
    </div>

         </div>
  )
}

export default SignIn