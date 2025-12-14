import { createContext, useEffect, useState } from 'react'
import { auth } from '../../Firebase/firebase.config'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'

export const  AuthContext = createContext(null)

const AuthProvider = ({children}) => {
      const [user, setUser] = useState(null)
      const [loading, setLoading] = useState(true)

    const registerUser = (email,password) => {
        setLoading(true)
  return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
       return signInWithEmailAndPassword(auth, email, password)
    }
     
      /* logout */
       const logOut = () => {
         setLoading(true)
        return signOut(auth)
       }

       //update user's profile including img
     const updateUserProfile = (profile) => {
        if (!auth.currentUser) {
      return Promise.reject(new Error('No authenticated user'))
    }
        return updateProfile(auth.currentUser, profile)
        }
        
          // observe user state 
              useEffect(() => {
            const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
             })
              return () => unSubscribe()
                }, [])

          const authInfo = {
               registerUser,
                 loginUser,
                  logOut ,
              updateUserProfile,
                   user,
                 loading
             }


  return (
    <AuthContext value={authInfo}>
       { children}
         </AuthContext>
  )
}

export default AuthProvider