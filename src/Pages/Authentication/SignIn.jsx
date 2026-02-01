import React, { useContext, useState } from 'react'
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

   const [loginError, setLoginError] = useState('')

  const handleLogin = (data) => {
   // console.log('form data', data)
    setLoginError('')  // reset previous error

     loginUser(data.email, data.password)
     .then(result => {
    // console.log(result.user)
     successToast('login succesfull')
     navigate(location.state || '/')

    }).catch(error => {
     console.log(error)

       // Firebase specific error handling
        if (error.code === 'auth/user-not-found') {
          setLoginError('User not found. Please register first.')
        } else if (error.code === 'auth/wrong-password') {
          setLoginError('Wrong password. Please try again.')
        } else if (error.code === 'auth/invalid-email') {
          setLoginError('Invalid email address.')
        } else {
          setLoginError('Login failed. Please try again.')
        }
    })
  }

  return (
    <div className='card bg-base-100 w-full mx-auto max-w-sm '>

     <h1 className='text-2xl text-center font-semibold pt-7 px-5 italic'>Welcome to Red Pulse</h1>
    
    <div className='flex flex-col justify-center items-center py-5'>
   <form className='text-[#f00505] bg-[#ffdddd]' onSubmit={handleSubmit(handleLogin)}>
    <fieldset className="fieldset border-2 border-dashed border-[#f00505] rounded w-xs p-4">

  {/*email */}
  <div>
  <label className="text-xs font-bold">Email</label>
  <input type="email"  {...register('email', {required: true})}  
  className="input text-black" placeholder="Email" />

   {
   errors.email?.type === 'required' && <span className='text-[#6e1515]'> Email is required</span>
  }
    </div>

  {/*password*/}
  <div>
  <label className="text-xs font-bold">Password</label>
  <input type="password" {...register('password', {required: true, minLength:6 })}  
   className="input text-black" placeholder="Password" />

   {errors.password?.type ==='minLength' && <span className='text-[#6e1515]'>
    Password must be 6 characters or longer </span>}
</div>

    {/* show login error */}
  {loginError && <p className="text-[#6e1515] mt-2">{loginError}</p>}

  <button className="btn bg-[#eb2c29] text-white mt-4">Login</button>

    <p className='pt-2 text-center'>Don't have an account? <span className=' hover:underline hover:text-blue-500 '>
       <Link to={'/register'} className='text-primary'> Register </Link> 
      </span> </p>
  </fieldset>
    </form>
    </div>

         </div>
  )
}

export default SignIn