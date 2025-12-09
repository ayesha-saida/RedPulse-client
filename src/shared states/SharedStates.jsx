import React, { useEffect, useState } from 'react'

export function useSharedStates () {
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
     } 
       catch (error){
         console.log(error)
      }
    }
       loadJSON()
    
     }, [])
    
  return { bloodGroup, setBloodGroup, 
           district, setDistrict, 
           upazila, setUpazila 
   }
}
