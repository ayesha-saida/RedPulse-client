import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router'
import { AuthContext } from '../Context/AuthProvider'
import { successToast } from '../../shared components/ToastContainer'

const SignIn = () => {
    const {loginUser} = useContext(AuthContext)
   const navigate = useNavigate()
   const {register, handleSubmit, formState:{errors}} = useForm()
   const location = useLocation()
  //console.log('In login page', location)

  const handleLogin = (data) => {
    console.log('form data', data)

     loginUser(data.email, data.password)
     .then(result => {
     console.log(result.user)
     successToast('login succesfull')
     navigate(location.state || '/')

    }).catch(error => {
     console.log(error)
    })
  }

  return (
    <div className='card bg-base-100 w-full mx-auto max-w-sm '>

     <h1 className='text-2xl text-center font-semibold pt-7 px-5'>Welcome to Red Pulse</h1>
    
    <div className='flex flex-col justify-center items-center py-5'>
   <form className='text-[#f00505] bg-[#ffdddd]' onSubmit={handleSubmit(handleLogin)}>
    <fieldset className="fieldset border-2 border-dashed border-[#f00505] rounded w-xs p-4">

  {/*email */}
  <label className="text-xs font-bold">Email</label>
  <input type="email"  {...register('email', {required: true})}  className="input" placeholder="Email" />

   {
   errors.email?.type === 'required' && <span className='text-[#6e1515]'> Email is required</span>
  }

  {/*password*/}
  <label className="text-xs font-bold">Password</label>
  <input type="password" {...register('password', {required: true, 
    minLength:6 })}  className="input" placeholder="Password" />

   {errors.password?.type ==='minLength' && <span className='text-[#6e1515]'>Password must be 6 characters or longer</span>}

  <button className="btn bg-[#eb2c29] text-white mt-4">Login</button>

    <p className='pt-2 text-center'>Don't have an account? <Link to={'/register'} className='text-primary hover:underline hover:text-blue-500'> Register </Link> </p>
  </fieldset>
    </form>
    </div>

         </div>
  )
}

export default SignIn