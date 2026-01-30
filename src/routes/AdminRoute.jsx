import React, { useContext } from 'react'
import { AuthContext } from '../Pages/Context/AuthProvider'
import useRole from '../Hooks/useRole'
import Loading from '../shared components/Loading'

const AdminRoute = ({children}) => {
    const {loading} = useContext(AuthContext)
    const {role, roleLoading} = useRole()

    if(loading || roleLoading) {
        return <Loading /> 
    }
    if(role !== 'admin') {
        return <p className='text-xl text-center py-7'>
            Your are forbidden to access this page.
        </p>
    }
  return children
}

export default AdminRoute