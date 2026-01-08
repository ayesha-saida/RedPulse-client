import React, { useContext } from 'react'
import { AuthContext } from '../Pages/Context/AuthProvider'
import Loading from '../shared components/Loading'
import { Navigate } from 'react-router'

const PrivateRouter = ({children}) => {
     const {user, loading} = useContext(AuthContext)
         if (loading) {
              return <Loading /> 
          } 
         if (user) {
              return children
         } 

  return <Navigate to={'/login'} />  
}

export default PrivateRouter