import { Link } from 'react-router'
import { useSharedStates } from '../../Shared states/SharedStates';
import { useForm } from "react-hook-form"
import { useEffect } from 'react';

const SignUp = () => {
    const { bloodGroup, district, upazila } = useSharedStates();

    const { register, handleSubmit, watch, setValue, formState:{ errors }} = useForm()
 
  const onSubmit = async (data) => { 
    console.log('After Register:', data)

    // Get the file from the form
      const imageFile = data.avatar[0];
      const formData = new FormData();
      formData.append("image", imageFile);

         // Upload to ImgBB
     /* const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      ); */


}
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

  return (
     <div className='w-11/12 mx-auto'>
        <h1 className='text-2xl text-center font-semibold pt-7'>Welcome! Please Register to Access Our Blood Donation Services</h1>
   
  <div className='flex flex-col justify-center items-center py-5'> 
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
   
       {/*name field */}
  <label className="label">Name</label>
  <input type="text" className="input" {...register("name",{ required: true, maxLength: 20, minLength:4 })} placeholder="Enter your Name" required />

    {errors.name?.type==='required' && <span className='text-red-500'>Name is required</span>}
    {errors.name?.type ==='minLength' && <span className='text-red-500'>Name must be 4 characters or longer</span>}
    {errors.name?.type ==='maxLength' && <span className='text-red-500'>Name must be in 20 characters</span>}
 
      {/*email field */}
  <label className="label">Email</label>
  <input type="email"  {...register('email', { required: true })} className="input" placeholder="Email" required />

   {errors.email?.type==='required' && <span className='text-red-500'>Email is required</span>}
   
      {/*photo image / user avatar field */}
  <label className="label">Photo</label>
  <input type="file"
   className="file-input"
   {...register("avatar", { required: "Avatar is required" })} />


      {/*blood group selection field */}
  <label className="label">Blood Group</label>
  <select  {...register("group")}   className="select">  
  <option value=''> Select </option>
   { 
  bloodGroup.map( (group,id) =>  <option key={id}> {group.blood_group} </option> )
    }
</select>

      {/*district group selection field */}
  <label className="label">District</label>
  <select  {...register("district")}   className="select">
  <option value=''> Select </option>
  { district.map((district)=> <option key={district.id} value={district.id}>{district.name}</option>)
    }
</select>

      {/*upazila group selection field */}
  <label className="label">Upazila</label>
  <select  {...register("upazila")}  className="select" disabled={!selectedDistrict}>
  <option value=''> Select </option>
    { filteredUpazilas.map( (upazila) => <option key={upazila.id} value={upazila.id}>
    {upazila.name} </option>
  )}
</select>

        {/*password field */}
  <label className="label">Password</label>
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
  <label className="label">Confirm Password</label>
  <input type="password"  {...register("confirmPassword", {
          required: true,
          validate: (value) =>
            value === password || "Passwords do not match",
        })}
     className="input" placeholder="Confirm Password" />

  {  errors.confirmPassword && (
        <span className="text-red-500">{errors.confirmPassword.message}</span>
      )}

  <button type='submit' className="btn bg-[#eb2c29] text-white mt-4">Register</button>

  <p className='pt-2 text-center text-base-content'>Already have an account? <Link to={'/login'} className='text-primary hover:underline hover:text-blue-500'> Login </Link> </p>
 </fieldset>
      </form>
    </div>

    </div>
  )
}

export default SignUp