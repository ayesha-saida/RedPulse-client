import { Link, useLocation, useNavigate } from 'react-router'
import { useSharedStates } from '../../Shared states/SharedStates';
import { useForm } from "react-hook-form"
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import axios from 'axios';
import { successToast } from '../../shared components/ToastContainer';
 

const SignUp = () => {
   const navigate = useNavigate()
  const location = useLocation()
  console.log('In register page', location)

    const { bloodGroup, district, upazila } = useSharedStates();

    const { register, handleSubmit, watch, setValue, formState:{ errors }} = useForm()
 
    const {registerUser, updateUserProfile} = useContext(AuthContext);

 // Watch selected district
  const selectedDistrict = watch("district");

  // Filter upazila based on selected region
  const filteredUpazilas = upazila.filter(
    (u) => u.district_id  ===  (selectedDistrict)
  );

  // Reset upazila when district changes
  useEffect(() => {
    setValue("upazila", "");
  }, [selectedDistrict, setValue])

    // Watch the password field value
  const password = watch("password");

    const registerSubmit = async (data) => { 
    console.log('After Register:', data)
    const imageFile = data.avatar[0]

    registerUser(data.email, data.password).then(result => {
    console.log(result.user)

   // Get the file from the form
         //  const imageFile = data.avatar[0];
      const formData = new FormData();
      formData.append("image", imageFile);

       //send the photo to store and get the url
  const img_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMGBB_API_KEY}`
 axios.post( img_API_URL , formData)
  .then(res => {
    console.log('after image upload', res.data.data.url)
  
    //update user profile in firebase
    const userProfile = {
      displayName: data.name,
      photoURL: res.data.data.url,
    }

     updateUserProfile(userProfile)
  .then(() => {
    console.log('User Profile updated done')
      navigate(location.state || '/')
  })
  .catch(error => console.log(error))
  })

    successToast('Registration Successfull')
     navigate('/')

    }).catch(error => {
  console.log(error)
   })
    
}

  return (
     <div className='w-11/12 mx-auto'>
        <h1 className='text-2xl text-center font-semibold pt-7 px-2 italic -mx-2'>Welcome! Please Register to Access Our Blood Donation Services</h1>
   
  <div className='flex flex-col justify-center items-center py-5'> 
      <form onSubmit={handleSubmit(registerSubmit)} className='text-[#f00505] bg-[#ffdddd]'>
        <fieldset className="fieldset border-2 border-dashed border-[#f00505] rounded w-xs p-4">
   
       {/*name field */}
  <label className="text-xs font-bold">Name</label>
  <input type="text" className="input" {...register("name",{ required: true, maxLength: 20, minLength:4 })} placeholder="Enter your Name" required />

    {errors.name?.type==='required' && <span className='text-red-500'>Name is required</span>}
    {errors.name?.type ==='minLength' && <span className='text-red-500'>Name must be 4 characters or longer</span>}
    {errors.name?.type ==='maxLength' && <span className='text-red-500'>Name must be in 20 characters</span>}
 
      {/*email field */}
  <label className="text-xs font-bold">Email</label>
  <input type="email"  {...register('email', { required: true })} className="input" placeholder="Email" required />

   {errors.email?.type==='required' && <span className='text-red-500'>Email is required</span>}
   
      {/*photo image / user avatar field */}
  <label className="text-xs font-bold">Photo</label>
  <input type="file"
   className="file-input"
   {...register("avatar", { required: "Avatar is required" })} />


      {/*blood group selection field */}
  <label className="text-xs font-bold">Blood Group</label>
  <select  {...register("group")}   className="select">  
  <option value=''> Select </option>
   { 
  bloodGroup.map( (group,id) =>  <option key={id}> {group.blood_group} </option> )
    }
</select>

      {/*district group selection field */}
  <label className="text-xs font-bold">District</label>
  <select  {...register("district")}   className="select">
  <option value=''> Select </option>
  { district.map((district)=> <option key={district.id} value={district.id}>{district.name}</option>)
    }
</select>

      {/*upazila group selection field */}
  <label className="text-xs font-bold">Upazila</label>
  <select  {...register("upazila")}  className="select" disabled={!selectedDistrict}>
  <option value=''> Select </option>
    { filteredUpazilas.map( (upazila) => <option key={upazila.id} value={upazila.id}>
    {upazila.name} </option>
  )}
</select>

        {/*password field */}
  <label className="text-xs font-bold">Password</label>
  <input type="password" {...register('password', { 
    required: true,
    minLength:6,
    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/ ,
   })} 
    className="input" placeholder="Password" />
     
     {errors.password?.type ==='required' && <span className='text-red-500'>Password is required</span>}
     {errors.password?.type ==='minLength' && <span className='text-red-500'>Password must be 6 characters or longer</span>}
     {errors.password?.type ==='pattern' && <span className='text-red-500'>Password must have at least one uppercase, at least one lowercase, at least one number and at least one special characters.  </span>}

       {/*confirm password field */}
  <label className="text-xs font-bold">Confirm Password</label>
  <input type="password"  {...register("confirmPassword", {
          required: true,
          validate: (value) =>
            value === password || "Passwords do not match",
        })}
     className="input" placeholder="Confirm Password" />

  {  errors.confirmPassword && (
        <span className="text-red-500">{errors.confirmPassword.message}</span>
      )}

  <button className="btn bg-[#eb2c29] text-white mt-4">Register</button>

  <p className='pt-2 text-center'>Already have an account? <Link to={'/login'} className='text-primary hover:underline hover:text-blue-500'> Login </Link> </p>
 </fieldset>
      </form>
    </div>

    </div>
  )
}

export default SignUp