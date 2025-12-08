import { useEffect, useState } from 'react'
import { Link } from 'react-router'

const SignUp = () => {
  const [bloodGroup, setBloodGroup] = useState([])
  const [district, setDistrict] = useState([])
  const [upazila, setUpazila] = useState([])


  //load json data
 useEffect( () => {
  const loadJSON = async () => {
 try{
   const res1 = await fetch('/bloodgroup.json');
   const res2 = await  fetch('/district.json');
   const res3 = await  fetch('/upazila.json');

   const json1 = await res1.json();
   const json2 = await res2.json();
   const json3 = await res3.json();

   setBloodGroup(json1)
   setDistrict(json2)
   setUpazila(json3)

    // console.log(json1)
   // console.log(json2)
  // console.log(json3)
 } 
   catch (error){
     console.log(error)
  }
}
   loadJSON()

 }, [])

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
   { 
  bloodGroup.map( (group,id) =>  <option key={id}> {group.blood_group} </option> )
    }
</select>

      {/*district group selection field */}
  <label className="label">District</label>
  <select defaultValue="select" className="select">
  <option disabled={true}> Select </option>
  { district.map((district,id )=> <option key={id}>{district.name}</option>)
    }
</select>

      {/*upazila group selection field */}
  <label className="label">Upazila</label>
  <select defaultValue="select" className="select">
  <option disabled={true}> Select </option>
  {  upazila.map( (upazila,id) => <option key={id}>{upazila.name}</option>)
  }
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